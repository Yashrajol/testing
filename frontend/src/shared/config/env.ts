/**
 * Runtime Environment Configuration & Validation
 */

export interface AppEnvConfig {
  apiUrl: string;
  appEnv: 'development' | 'staging' | 'production';
  isProduction: boolean;
  enableAnalytics: boolean;
  sentryDsn?: string;
}

function validateEnv(): AppEnvConfig {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const appEnv = (import.meta.env.VITE_APP_ENV || 'production') as any;
  const enableAnalytics = import.meta.env.VITE_ENABLE_ANALYTICS !== 'false';
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN || undefined;

  return {
    apiUrl,
    appEnv,
    isProduction: appEnv === 'production',
    enableAnalytics,
    sentryDsn,
  };
}

export const envConfig = validateEnv();
