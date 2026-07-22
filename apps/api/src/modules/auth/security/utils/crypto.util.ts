import * as crypto from 'crypto';

export class CryptoUtil {
  static constantTimeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false;
    }
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    return crypto.timingSafeEqual(bufA, bufB);
  }

  static generateRandomString(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  static sha256(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}
