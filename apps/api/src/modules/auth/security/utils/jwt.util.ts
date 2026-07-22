import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

export class JwtUtil {
  static signToken(jwtService: JwtService, payload: JwtPayload, secret: string, expiresIn: string): string {
    return jwtService.sign(payload, { secret, expiresIn: expiresIn as any });
  }

  static verifyToken(jwtService: JwtService, token: string, secret: string): JwtPayload {
    return jwtService.verify<JwtPayload>(token, { secret });
  }
}
