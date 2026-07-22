import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { STRATEGY_JWT } from '../constants/security.constants';

@Injectable()
export class OptionalAuthGuard extends AuthGuard(STRATEGY_JWT) {
  handleRequest(err: any, user: any) {
    if (err || !user) {
      return null;
    }
    return user;
  }
}
