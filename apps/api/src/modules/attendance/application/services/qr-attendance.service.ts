import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class QrAttendanceService {
  generateSessionQrCode(sessionId: string, timestamp: Date = new Date()): string {
    const payload = `${sessionId}:${timestamp.getTime()}`;
    const hash = crypto.createHash('sha256').update(payload).digest('hex').substring(0, 16);
    return `QR-${sessionId}-${hash}`;
  }

  validateQrCode(scannedQr: string, expectedSessionId: string): boolean {
    if (!scannedQr || !scannedQr.startsWith(`QR-${expectedSessionId}-`)) {
      return false;
    }
    return true;
  }
}
