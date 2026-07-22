import { describe, it, expect } from 'vitest';
import { sanitizeText, validateFileUpload } from '@/shared/security/sanitization';
import { authStore } from '@/shared/api/auth-store';

describe('Security & Sanitization Utilities', () => {
  it('should escape malicious XSS characters in strings', () => {
    const maliciousInput = '<script>alert("XSS")</script>';
    const sanitized = sanitizeText(maliciousInput);
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
  });

  it('should validate allowed file upload types and reject unapproved extensions', () => {
    const validFile = new File(['content'], 'certificate.pdf', { type: 'application/pdf' });
    const invalidFile = new File(['executable'], 'virus.exe', { type: 'application/x-msdownload' });

    const validResult = validateFileUpload(validFile);
    expect(validResult.valid).toBe(true);

    const invalidResult = validateFileUpload(invalidFile);
    expect(invalidResult.valid).toBe(false);
    expect(invalidResult.error).toContain('extension .exe is not permitted');
  });

  it('should store and clear authentication sessions securely in authStore', () => {
    const dummyUser = { id: 'usr-1', email: 'test@vedhkrit.com', name: 'Test User', role: 'student' };
    authStore.setSession('accessToken123', 'refreshToken456', dummyUser);

    expect(authStore.getAccessToken()).toBe('accessToken123');
    expect(authStore.getRefreshToken()).toBe('refreshToken456');
    expect(authStore.getUser()?.name).toBe('Test User');
    expect(authStore.getRole()).toBe('student');

    authStore.clearSession();
    expect(authStore.getAccessToken()).toBeNull();
    expect(authStore.getUser()).toBeNull();
  });
});
