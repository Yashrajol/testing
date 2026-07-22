import { Module } from '@nestjs/common';
import { CacheModule } from '@vedhkrit/cache';
import { AuthModule } from '../auth/auth.module';
import { LearningDnaModule } from '../learning-dna/learning-dna.module';
import { GrowthModule } from '../growth/growth.module';
import { GatewayController } from './gateway.controller';
import { GATEWAY_PROVIDERS } from './gateway.providers';

@Module({
  imports: [
    CacheModule,
    AuthModule,
    LearningDnaModule,
    GrowthModule,
  ],
  controllers: [GatewayController],
  providers: GATEWAY_PROVIDERS,
  exports: [...GATEWAY_PROVIDERS],
})
export class GatewayModule {}
