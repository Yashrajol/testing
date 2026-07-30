import crypto from 'crypto';

/**
 * Generate a v4 UUID
 */
export function cryptoNativeUuid() {
  return crypto.randomUUID();
}

/**
 * Generate a random 6-digit numeric OTP string
 */
export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}