import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useServerHealth } from '@/lib/hooks/useServer';
import { usePlatform } from '@/platform/PlatformContext';
import { useServerStore } from '@/stores/serverStore';

type ConnectionFormValues = {
  serverUrl: string;
};

export function ConnectionForm() {
  const { t } = useTranslation();
  const platform = usePlatform();
  const serverUrl = useServerStore((state) => state.serverUrl);
  const setServerUrl = useServerStore((state) => state.setServerUrl);
  const keepServerRunningOnClose = useServerStore((state) => state.keepServerRunningOnClose);
  const setKeepServerRunningOnClose = useServerStore((state) => state.setKeepServerRunningOnClose);
  const mode = useServerStore((state) => state.mode);
  const setMode = useServerStore((state) => state.setMode);
  const { toast } = useToast();
  const { data: health, isLoading, error: healthError } = useServerHealth();
  const connectionSchema = z.object({
    serverUrl: z.string().url(t('settings.general.serverUrl.invalidUrl')),
  });

  const form = useForm<ConnectionFormValues>({
    resolver: zodResolver(connectionSchema),
    defaultValues: {
      serverUrl: serverUrl,
    },
  });

  // Sync form with store when serverUrl changes externally
  useEffect(() => {
    form.reset({ serverUrl });
  }, [serverUrl, form]);

  const { isDirty } = form.formState;

  function onSubmit(data: ConnectionFormValues) {
    setServerUrl(data.serverUrl);
    form.reset(data);
    toast({
      title: t('settings.general.serverUrl.updatedTitle'),
      description: t('settings.general.serverUrl.updatedDescription', { url: data.serverUrl }),
    });
  }

  return (
    <Card role="region" aria-label={t('settings.general.serverConnection.title')} tabIndex={0}>
      <CardHeader>
        <CardTitle>{t('settings.general.serverConnection.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="serverUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('settings.general.serverUrl.title')}</FormLabel>
                  <FormControl>
                    <Input placeholder="http://127.0.0.1:17493" {...field} />
                  </FormControl>
                  <FormDescription>{t('settings.general.serverUrl.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isDirty && (
              <Button type="submit">{t('settings.general.serverConnection.update')}</Button>
            )}
          </form>
        </Form>

        {/* Connection status */}
        <div className="mt-4">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm text-muted-foreground">
                {t('settings.general.connection.checking')}
              </span>
            </div>
          ) : healthError ? (
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive">
                {t('settings.general.connection.failed', { message: healthError.message })}
              </span>
            </div>
          ) : health ? (
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
              {health.vram_used_mb != null && health.vram_used_mb > 0 && (
                <Badge variant="outline">VRAM: {health.vram_used_mb.toFixed(0)} MB</Badge>
              )}
            </div>
          ) : null}
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="keepServerRunning"
              className="mt-[6px]"
              checked={keepServerRunningOnClose}
              onCheckedChange={(checked: boolean) => {
                setKeepServerRunningOnClose(checked);
                platform.lifecycle.setKeepServerRunning(checked).catch((error) => {
                  console.error('Failed to sync setting to Rust:', error);
                });
                toast({
                  title: t('settings.general.keepServerRunning.updatedTitle'),
                  description: checked
                    ? t('settings.general.keepServerRunning.runningDescription')
                    : t('settings.general.keepServerRunning.stoppedDescription'),
                });
              }}
            />
            <div className="space-y-1">
              <label
                htmlFor="keepServerRunning"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {t('settings.general.keepServerRunning.title')}
              </label>
              <p className="text-sm text-muted-foreground">
                {t('settings.general.keepServerRunning.description')}
              </p>
            </div>
          </div>
        </div>

        {platform.metadata.isTauri && (
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="allowNetworkAccess"
                className="mt-[6px]"
                checked={mode === 'remote'}
                onCheckedChange={(checked: boolean) => {
                  setMode(checked ? 'remote' : 'local');
                  toast({
                    title: t('settings.general.networkAccess.updatedTitle'),
                    description: checked
                      ? t('settings.general.networkAccess.enabled')
                      : t('settings.general.networkAccess.disabled'),
                  });
                }}
              />
              <div className="space-y-1">
                <label
                  htmlFor="allowNetworkAccess"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {t('settings.general.networkAccess.title')}
                </label>
                <p className="text-sm text-muted-foreground">
                  {t('settings.general.networkAccess.description')}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
