import { Injectable } from '@nestjs/common';
import { AUTH_DEFAULTS } from '../../constants/auth.constants';

@Injectable()
export class SessionService {
  calculateSessionExpiry(): Date {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + AUTH_DEFAULTS.SESSION_EXPIRY_DAYS);
    return expiresAt;
  }

  calculateRefreshTokenExpiry(): Date {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + AUTH_DEFAULTS.REFRESH_TOKEN_EXPIRY_DAYS);
    return expiresAt;
  }
}
