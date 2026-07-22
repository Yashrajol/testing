import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '@vedhkrit/database';
import { AppConfigModule } from '@vedhkrit/config';
import { AuthController } from './auth.controller';
import { AUTH_PROVIDERS } from './auth.providers';
import { AUTH_REPOSITORY_TOKEN } from './constants/auth.constants';

@Module({
  imports: [
    PrismaModule,
    AppConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: AUTH_PROVIDERS,
  exports: [
    AUTH_REPOSITORY_TOKEN,
    ...AUTH_PROVIDERS,
  ],
})
export class AuthModule {}
