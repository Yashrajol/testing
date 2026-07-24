import configuration from './configuration';
import {
  AllConfig,
  AppConfig,
  AuthConfig,
  DatabaseConfig,
  MailConfig,
  RedisConfig,
  RabbitMQConfig,
  AiConfig,
  StorageConfig,
} from './types';

export class AppConfigService {
  private readonly config: AllConfig;

  constructor() {
    this.config = configuration();
  }

  get app(): AppConfig {
    return this.config.app;
  }

  get auth(): AuthConfig {
    return this.config.auth;
  }

  get database(): DatabaseConfig {
    return this.config.database;
  }

  get mail(): MailConfig {
    return this.config.mail;
  }

  get redis(): RedisConfig {
    return this.config.redis;
  }

  get rabbitmq(): RabbitMQConfig {
    return this.config.rabbitmq;
  }

  get ai(): AiConfig {
    return this.config.ai;
  }

  get storage(): StorageConfig {
    return this.config.storage;
  }
}

export const appConfig = new AppConfigService();
