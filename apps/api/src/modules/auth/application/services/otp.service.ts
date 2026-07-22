import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class OtpService {
  generateCode(length: number = 6): string {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(min + Math.random() * (max - min + 1)).toString();
  }

  hashCode(code: string): string {
    return crypto.createHash('sha256').update(code).digest('hex');
  }

  verifyCode(code: string, hash: string): boolean {
    const computedHash = this.hashCode(code);
    return crypto.timingSafeEqual(Buffer.from(computedHash), Buffer.from(hash));
  }
}
