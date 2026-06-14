import { Loader2, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useServerHealth } from '@/lib/hooks/useServer';
import { useServerStore } from '@/stores/serverStore';

export function ServerStatus() {
  const { t } = useTranslation();
  const { data: health, isLoading, error } = useServerHealth();
  const serverUrl = useServerStore((state) => state.serverUrl);

  return (
    <Card role="region" aria-label={t('settings.general.serverStatus.title')} tabIndex={0}>
      <CardHeader>
        <CardTitle>{t('settings.general.serverStatus.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">
            {t('settings.general.serverUrl.title')}
          </div>
          <div className="font-mono text-sm">{serverUrl}</div>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">{t('settings.general.connection.checking')}</span>
          </div>
        ) : error ? (
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-destructive" />
            <span className="text-sm text-destructive">
              {t('settings.general.connection.failed', { message: error.message })}
            </span>
          </div>
        ) : health ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">{t('settings.general.connection.connected')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={health.model_loaded || health.model_downloaded ? 'default' : 'secondary'}
              >
                {health.model_loaded || health.model_downloaded
                  ? t('settings.general.connection.modelReady')
                  : t('settings.general.connection.noModel')}
              </Badge>
              <Badge variant={health.gpu_available ? 'default' : 'secondary'}>
                {t('settings.general.connection.gpuStatus', {
                  status: health.gpu_available
                    ? t('settings.general.connection.available')
                    : t('settings.general.connection.notAvailable'),
                })}
              </Badge>
              {health.vram_used_mb && (
                <Badge variant="outline">VRAM: {health.vram_used_mb.toFixed(0)} MB</Badge>
              )}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
