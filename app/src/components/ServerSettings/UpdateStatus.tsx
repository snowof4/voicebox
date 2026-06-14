import { AlertCircle, Download, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAutoUpdater } from '@/hooks/useAutoUpdater';
import { usePlatform } from '@/platform/PlatformContext';

export function UpdateStatus() {
  const { t } = useTranslation();
  const platform = usePlatform();
  const { status, checkForUpdates, downloadAndInstall, restartAndInstall } = useAutoUpdater(false);
  const [currentVersion, setCurrentVersion] = useState<string>('');
  const isDev = !import.meta.env?.PROD;

  useEffect(() => {
    platform.metadata
      .getVersion()
      .then(setCurrentVersion)
      .catch(() => setCurrentVersion(t('common.unknown')));
  }, [platform, t]);

  return (
    <Card role="region" aria-label={t('settings.general.updates.title')} tabIndex={0}>
      <CardHeader>
        <CardTitle>{t('settings.general.updates.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm font-medium">
              {t('settings.general.updates.currentVersion')}
            </div>
            <div className="text-sm text-muted-foreground">
              v{currentVersion}
              {isDev ? t('settings.general.updates.devSuffix') : ''}
            </div>
          </div>
          {!isDev && (
            <Button
              onClick={checkForUpdates}
              disabled={status.checking || status.downloading || status.readyToInstall}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${status.checking ? 'animate-spin' : ''}`} />
              {t('settings.general.updates.check.title')}
            </Button>
          )}
        </div>

        {isDev ? (
          <div className="text-sm text-muted-foreground">
            {t('settings.general.updates.devMode.description')}
          </div>
        ) : (
          <>
            {status.checking && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="h-4 w-4 animate-spin" />
                {t('settings.general.updates.checking')}
              </div>
            )}

            {status.error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {status.error}
              </div>
            )}

            {status.available && !status.downloading && !status.readyToInstall && (
              <div className="space-y-3 p-4 border rounded-lg bg-primary/5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">
                      {t('settings.general.updates.availableTitle')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t('settings.general.updates.version', { version: status.version })}
                    </div>
                  </div>
                  <Badge>{t('settings.general.updates.newBadge')}</Badge>
                </div>
                <Button onClick={downloadAndInstall} className="w-full" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  {t('settings.general.updates.download.button')}
                </Button>
              </div>
            )}

            {status.downloading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    {t('settings.general.updates.downloading')}
                  </div>
                  {status.downloadProgress !== undefined && (
                    <span className="text-muted-foreground">{status.downloadProgress}%</span>
                  )}
                </div>
                <Progress value={status.downloadProgress} />
                {status.downloadedBytes !== undefined &&
                  status.totalBytes !== undefined &&
                  status.totalBytes > 0 && (
                    <div className="text-xs text-muted-foreground">
                      {(status.downloadedBytes / 1024 / 1024).toFixed(1)} MB /{' '}
                      {(status.totalBytes / 1024 / 1024).toFixed(1)} MB
                    </div>
                  )}
              </div>
            )}

            {status.readyToInstall && (
              <div className="space-y-3 p-4 border rounded-lg bg-accent/30 border-accent/50">
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-semibold">{t('settings.general.updates.ready.title')}</div>
                    <div className="text-sm text-muted-foreground">
                      {t('settings.general.updates.ready.downloaded', {
                        version: status.version,
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {t('settings.general.updates.ready.restartDescription')}
                </div>
                <Button onClick={restartAndInstall} className="w-full" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {t('settings.general.updates.ready.button')}
                </Button>
              </div>
            )}

            {!status.available && !status.checking && !status.error && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {t('settings.general.updates.check.upToDate')}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
