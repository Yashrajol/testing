import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization token required');
    }
    const token = authHeader.split(' ')[1];
    const payload = this.authService.verifyJwt(token);
    if (!payload) {
      throw new UnauthorizedException('Invalid or expired token');
    }
    request.user = payload;
    return true;
  }
}
