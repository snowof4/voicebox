import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertCircle, Download, Loader2, RotateCw, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { apiClient } from '@/lib/api/client';
import type { CudaDownloadProgress } from '@/lib/api/types';
import { useServerHealth } from '@/lib/hooks/useServer';
import { usePlatform } from '@/platform/PlatformContext';
import { useServerStore } from '@/stores/serverStore';

type RestartPhase = 'idle' | 'stopping' | 'waiting' | 'ready';

export function GpuAcceleration() {
  const { t } = useTranslation();
  const platform = usePlatform();
  const queryClient = useQueryClient();
  const serverUrl = useServerStore((state) => state.serverUrl);
  const { data: health } = useServerHealth();

  const [restartPhase, setRestartPhase] = useState<RestartPhase>('idle');
  const [error, setError] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<CudaDownloadProgress | null>(null);
  const healthPollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Query CUDA backend status
  const {
    data: cudaStatus,
    isLoading: _cudaStatusLoading,
    refetch: refetchCudaStatus,
  } = useQuery({
    queryKey: ['cuda-status', serverUrl],
    queryFn: () => apiClient.getCudaStatus(),
    refetchInterval: (query) => (query.state.status === 'pending' ? false : 10000),
    retry: 1,
    enabled: !!health, // Only fetch when backend is reachable
  });

  // Derived state
  const isCurrentlyCuda = health?.backend_variant === 'cuda';
  const cudaAvailable = cudaStatus?.available ?? false;
  const cudaDownloading = cudaStatus?.downloading ?? false;

  // Clean up health poll on unmount
  useEffect(() => {
    return () => {
      if (healthPollRef.current) {
        clearInterval(healthPollRef.current);
        healthPollRef.current = null;
      }
    };
  }, []);

  // SSE progress tracking during download
  useEffect(() => {
    if (!cudaDownloading || !serverUrl) {
      return;
    }

    const eventSource = new EventSource(`${serverUrl}/backend/cuda-progress`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as CudaDownloadProgress;
        setDownloadProgress(data);

        if (data.status === 'complete') {
          eventSource.close();
          setDownloadProgress(null);
          refetchCudaStatus();
        } else if (data.status === 'error') {
          eventSource.close();
          setError(data.error || t('settings.gpu.errors.downloadFailed'));
          setDownloadProgress(null);
          refetchCudaStatus();
        }
      } catch (e) {
        console.error('Error parsing CUDA progress event:', e);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [cudaDownloading, serverUrl, refetchCudaStatus, t]);

  // Start aggressive health polling during restart
  const startHealthPolling = useCallback(() => {
    if (healthPollRef.current) return;

    healthPollRef.current = setInterval(async () => {
      try {
        const result = await apiClient.getHealth();
        if (result.status === 'healthy') {
          // Server is back up
          if (healthPollRef.current) {
            clearInterval(healthPollRef.current);
            healthPollRef.current = null;
          }
          setRestartPhase('ready');
          // Invalidate all queries to refresh UI
          queryClient.invalidateQueries();
          // Reset after a moment
          setTimeout(() => setRestartPhase('idle'), 2000);
        }
      } catch {
        // Server still down, keep polling
      }
    }, 1000);
  }, [queryClient]);

  const handleDownload = async () => {
    setError(null);
    try {
      await apiClient.downloadCudaBackend();
      refetchCudaStatus();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : t('settings.gpu.errors.downloadStart');
      if (msg.includes('already downloaded')) {
        refetchCudaStatus();
      } else {
        setError(msg);
      }
    }
  };

  const handleRestart = async () => {
    setError(null);
    setRestartPhase('stopping');

    try {
      setRestartPhase('waiting');
      startHealthPolling();
      await platform.lifecycle.restartServer();
      // Invoke resolved — server is likely ready. Stop polling and refresh.
      if (healthPollRef.current) {
        clearInterval(healthPollRef.current);
        healthPollRef.current = null;
      }
      setRestartPhase('ready');
      queryClient.invalidateQueries();
      setTimeout(() => setRestartPhase('idle'), 2000);
    } catch (e: unknown) {
      setRestartPhase('idle');
      if (healthPollRef.current) {
        clearInterval(healthPollRef.current);
        healthPollRef.current = null;
      }
      setError(e instanceof Error ? e.message : t('settings.gpu.errors.restartFailed'));
    }
  };

  const handleSwitchToCpu = async () => {
    // To switch to CPU: delete the CUDA binary, then restart.
    // start_server always prefers CUDA if present, so we must remove it first.
    setError(null);
    setRestartPhase('stopping');

    try {
      await apiClient.deleteCudaBackend();
      setRestartPhase('waiting');
      startHealthPolling();
      await platform.lifecycle.restartServer();
      // Invoke resolved — server is likely ready
      if (healthPollRef.current) {
        clearInterval(healthPollRef.current);
        healthPollRef.current = null;
      }
      setRestartPhase('ready');
      queryClient.invalidateQueries();
      setTimeout(() => setRestartPhase('idle'), 2000);
    } catch (e: unknown) {
      setRestartPhase('idle');
      if (healthPollRef.current) {
        clearInterval(healthPollRef.current);
        healthPollRef.current = null;
      }
      setError(e instanceof Error ? e.message : t('settings.gpu.errors.switchCpu'));
      refetchCudaStatus();
    }
  };

  const handleDelete = async () => {
    setError(null);
    try {
      await apiClient.deleteCudaBackend();
      refetchCudaStatus();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t('settings.gpu.errors.deleteCuda'));
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / k ** i).toFixed(1)} ${sizes[i]}`;
  };

  // Don't render until health data is available
  if (!health) return null;

  // If the system already has native GPU (MPS, etc.), only show info - no CUDA needed
  const hasNativeGpu =
    health.gpu_available &&
    !isCurrentlyCuda &&
    health.gpu_type &&
    !health.gpu_type.includes('CUDA');
  const restartPhaseLabel = {
    stopping: t('settings.gpu.restart.stopping'),
    waiting: t('settings.gpu.restart.waiting'),
    ready: t('settings.gpu.restart.ready'),
  } satisfies Record<Exclude<RestartPhase, 'idle'>, string>;
  const getRestartPhaseLabel = (phase: RestartPhase) =>
    phase === 'idle' ? '' : restartPhaseLabel[phase];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.gpu.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* GPU status */}
        <div className="space-y-1">
          {health.gpu_available && health.gpu_type ? (
            <>
              <div className="text-sm font-medium">
                {health.gpu_type.replace(/^(CUDA|ROCm|MPS|Metal|XPU|DirectML)\s*\((.+)\)$/, '$2') ||
                  health.gpu_type}
              </div>
              <div className="text-sm text-muted-foreground">
                {health.gpu_type.replace(/\s*\(.+\)$/, '')}
                {health.vram_used_mb != null && health.vram_used_mb > 0
                  ? ` \u00b7 ${t('settings.gpu.vramUsed', {
                      mb: health.vram_used_mb.toFixed(0),
                    })}`
                  : ''}
              </div>
            </>
          ) : (
            <>
              <div className="text-sm font-medium">CPU</div>
              <div className="text-sm text-muted-foreground">
                {t('settings.gpu.noAcceleration')}
              </div>
            </>
          )}
        </div>

        {/* Native GPU detected - no CUDA download needed */}

        {/* Currently running CUDA - show switch back to CPU */}
        {isCurrentlyCuda && platform.metadata.isTauri && (
          <>
            {restartPhase !== 'idle' ? (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">{getRestartPhaseLabel(restartPhase)}</span>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {t('settings.gpu.switchToCpu.description')}
                </p>
                <Button onClick={handleSwitchToCpu} variant="outline" className="w-full" size="sm">
                  <RotateCw className="h-4 w-4 mr-2" />
                  {t('settings.gpu.switchToCpu.title')}
                </Button>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </>
        )}

        {/* CUDA download/manage section - show when no native GPU and not currently running CUDA */}
        {!hasNativeGpu && !isCurrentlyCuda && (
          <>
            {/* Download progress (manual download or auto-update) */}
            {cudaDownloading && downloadProgress && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>
                      {downloadProgress.filename ||
                        (cudaAvailable
                          ? t('settings.gpu.cuda.updating')
                          : t('settings.gpu.cuda.downloading'))}
                    </span>
                  </div>
                  {downloadProgress.total > 0 && (
                    <span className="text-muted-foreground">
                      {downloadProgress.progress.toFixed(1)}%
                    </span>
                  )}
                </div>
                {downloadProgress.total > 0 && (
                  <>
                    <Progress value={downloadProgress.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {formatBytes(downloadProgress.current)} /{' '}
                      {formatBytes(downloadProgress.total)}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Restart in progress */}
            {restartPhase !== 'idle' && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">{getRestartPhaseLabel(restartPhase)}</span>
              </div>
            )}

            {/* Error display */}
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Actions */}
            {restartPhase === 'idle' && !cudaDownloading && (
              <div className="space-y-2">
                {/* Not downloaded yet - show download button */}
                {!cudaAvailable && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {t('settings.gpu.download.description')}
                    </p>
                    <Button onClick={handleDownload} className="w-full" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      {t('settings.gpu.download.title')}
                    </Button>
                  </div>
                )}

                {/* Downloaded but not active - show switch button */}
                {cudaAvailable && platform.metadata.isTauri && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {t('settings.gpu.switchToCuda.description')}
                    </p>
                    <Button onClick={handleRestart} className="w-full" size="sm">
                      <RotateCw className="h-4 w-4 mr-2" />
                      {t('settings.gpu.switchToCuda.title')}
                    </Button>
                  </div>
                )}

                {/* Delete option when downloaded (and not active) */}
                {cudaAvailable && (
                  <Button
                    onClick={handleDelete}
                    variant="ghost"
                    className="w-full text-muted-foreground "
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t('settings.gpu.remove.title')}
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
