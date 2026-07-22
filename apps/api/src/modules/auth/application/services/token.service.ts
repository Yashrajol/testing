import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '@vedhkrit/config';
import * as crypto from 'crypto';
import { AuthPayload, TokenClaims } from '../../domain/interfaces/auth-payload.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: AppConfigService,
  ) {}

  generateAccessToken(payload: AuthPayload): string {
    const claims: TokenClaims = {
      sub: payload.userId,
      email: payload.email,
      role: payload.role,
      sessionId: payload.sessionId || '',
    };

    return this.jwtService.sign(claims, {
      secret: this.configService.auth.jwtSecret,
      expiresIn: this.configService.auth.accessTokenExpiry as any,
    });
  }

  generateRefreshTokenString(): string {
    return crypto.randomBytes(40).toString('hex');
  }

  hashRefreshToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  verifyAccessToken(token: string): TokenClaims {
    return this.jwtService.verify<TokenClaims>(token, {
      secret: this.configService.auth.jwtSecret,
    });
  }
}
