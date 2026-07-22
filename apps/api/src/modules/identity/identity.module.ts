import { Module } from '@nestjs/common';
import { PrismaModule } from '@vedhkrit/database';
import { AppConfigModule } from '@vedhkrit/config';
import { AuthModule } from '../auth/auth.module';
import { IdentityController } from './identity.controller';
import { IDENTITY_PROVIDERS } from './identity.providers';
import { IDENTITY_REPOSITORY_TOKEN } from './constants/identity.constants';

@Module({
  imports: [
    PrismaModule,
    AppConfigModule,
    AuthModule,
  ],
  controllers: [IdentityController],
  providers: IDENTITY_PROVIDERS,
  exports: [
    IDENTITY_REPOSITORY_TOKEN,
    ...IDENTITY_PROVIDERS,
  ],
})
export class IdentityModule {}
