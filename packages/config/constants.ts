export enum Environment {
  DEVELOPMENT = 'development',
  TESTING = 'testing',
  PRODUCTION = 'production',
}

export const CONFIG_NAMESPACE = {
  APP: 'app',
  AUTH: 'auth',
  DATABASE: 'database',
  MAIL: 'mail',
  REDIS: 'redis',
  RABBITMQ: 'rabbitmq',
  AI: 'ai',
  STORAGE: 'storage',
} as const;
