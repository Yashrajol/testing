import { Environment } from './constants';

export interface AppConfig {
  name: string;
  env: Environment;
  port: number;
  corsOrigin: string;
  corsCredentials: boolean;
  rateLimitTtl: number;
  rateLimitMax: number;
}

export interface AuthConfig {
  jwtSecret: string;
  accessTokenExpiry: string;
  refreshTokenSecret: string;
  refreshTokenExpiry: string;
}

export interface DatabaseConfig {
  url: string;
  directUrl?: string;
  poolMin: number;
  poolMax: number;
  ssl: boolean;
}

export interface MailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db: number;
}

export interface RabbitMQConfig {
  url: string;
  queue: string;
}

export interface AiConfig {
  openaiApiKey?: string;
  anthropicApiKey?: string;
  geminiApiKey?: string;
  defaultModel: string;
}

export interface StorageConfig {
  provider: 's3' | 'local';
  s3Bucket?: string;
  s3Region?: string;
  s3AccessKeyId?: string;
  s3SecretAccessKey?: string;
  localPath: string;
}

export interface AllConfig {
  app: AppConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
  mail: MailConfig;
  redis: RedisConfig;
  rabbitmq: RabbitMQConfig;
  ai: AiConfig;
  storage: StorageConfig;
}
