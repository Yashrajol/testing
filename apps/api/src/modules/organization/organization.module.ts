import { Module } from '@nestjs/common';
import { PrismaModule } from '@vedhkrit/database';
import { AppConfigModule } from '@vedhkrit/config';
import { AuthModule } from '../auth/auth.module';
import { OrganizationController } from './organization.controller';
import { ORGANIZATION_PROVIDERS } from './organization.providers';
import { ORGANIZATION_REPOSITORY_TOKEN } from './constants/organization.constants';

@Module({
  imports: [
    PrismaModule,
    AppConfigModule,
    AuthModule,
  ],
  controllers: [OrganizationController],
  providers: ORGANIZATION_PROVIDERS,
  exports: [
    ORGANIZATION_REPOSITORY_TOKEN,
    ...ORGANIZATION_PROVIDERS,
  ],
})
export class OrganizationModule {}
