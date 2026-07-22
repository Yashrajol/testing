import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { STRATEGY_JWT_REFRESH } from '../constants/security.constants';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(STRATEGY_JWT_REFRESH) {}
