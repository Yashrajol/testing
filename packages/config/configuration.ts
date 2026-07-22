import { AllConfig } from './types';
import { Environment } from './constants';

export default (): AllConfig => ({
  app: {
    name: process.env.APP_NAME || 'VEDHKRIT API',
    env: (process.env.NODE_ENV as Environment) || Environment.DEVELOPMENT,
    port: parseInt(process.env.PORT || '5000', 10),
    corsOrigin: process.env.WEB_ORIGIN || 'http://localhost:8000',
    corsCredentials: process.env.CORS_CREDENTIALS === 'true',
    rateLimitTtl: parseInt(process.env.RATE_LIMIT_TTL || '60000', 10),
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'dev-jwt-secret-key-change-in-production',
    accessTokenExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'dev-refresh-token-secret-key-change-in-production',
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/vedhkrit?schema=public',
    directUrl: process.env.DIRECT_URL,
    poolMin: parseInt(process.env.DB_POOL_MIN || '2', 10),
    poolMax: parseInt(process.env.DB_POOL_MAX || '10', 10),
    ssl: process.env.DB_SSL === 'true',
  },
  mail: {
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT || '587', 10),
    user: process.env.MAIL_USER || '',
    pass: process.env.MAIL_PASS || '',
    from: process.env.MAIL_FROM || 'noreply@vedhkrit.com',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0', 10),
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
    queue: process.env.RABBITMQ_QUEUE || 'vedhkrit_queue',
  },
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    geminiApiKey: process.env.GEMINI_API_KEY,
    defaultModel: process.env.AI_DEFAULT_MODEL || 'gpt-4o',
  },
  storage: {
    provider: (process.env.STORAGE_PROVIDER as 's3' | 'local') || 'local',
    s3Bucket: process.env.S3_BUCKET,
    s3Region: process.env.S3_REGION || 'ap-south-1',
    s3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
    s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    localPath: process.env.STORAGE_LOCAL_PATH || './uploads',
  },
});
