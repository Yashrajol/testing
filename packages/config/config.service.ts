import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import {
  AppConfig,
  AuthConfig,
  DatabaseConfig,
  MailConfig,
  RedisConfig,
  RabbitMQConfig,
  AiConfig,
  StorageConfig,
} from './types';

@Injectable()
export class AppConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  get app(): AppConfig {
    return this.nestConfigService.get<AppConfig>('app')!;
  }

  get auth(): AuthConfig {
    return this.nestConfigService.get<AuthConfig>('auth')!;
  }

  get database(): DatabaseConfig {
    return this.nestConfigService.get<DatabaseConfig>('database')!;
  }

  get mail(): MailConfig {
    return this.nestConfigService.get<MailConfig>('mail')!;
  }

  get redis(): RedisConfig {
    return this.nestConfigService.get<RedisConfig>('redis')!;
  }

  get rabbitmq(): RabbitMQConfig {
    return this.nestConfigService.get<RabbitMQConfig>('rabbitmq')!;
  }

  get ai(): AiConfig {
    return this.nestConfigService.get<AiConfig>('ai')!;
  }

  get storage(): StorageConfig {
    return this.nestConfigService.get<StorageConfig>('storage')!;
  }
}
