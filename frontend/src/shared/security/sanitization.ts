/**
 * Security & Sanitization Utilities
 */

// XSS Safe Text Escaping
export function sanitizeText(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Secure File Upload Validator
export interface FileValidationOptions {
  maxSizeMb?: number;
  allowedTypes?: string[];
  allowedExtensions?: string[];
}

export function validateFileUpload(
  file: File,
  options: FileValidationOptions = {}
): { valid: boolean; error?: string } {
  const maxSizeMb = options.maxSizeMb ?? 10; // Default 10MB
  const maxSizeBytes = maxSizeMb * 1024 * 1024;

  const allowedTypes = options.allowedTypes ?? [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  const allowedExtensions = options.allowedExtensions ?? [
    '.jpg', '.jpeg', '.png', '.webp', '.pdf', '.xlsx', '.docx'
  ];

  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds maximum limit of ${maxSizeMb}MB.`,
    };
  }

  const extension = '.' + (file.name.split('.').pop() || '').toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: `File extension ${extension} is not permitted.`,
    };
  }

  if (file.type && !allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `MIME type ${file.type} is not allowed.`,
    };
  }

  return { valid: true };
}

// CSRF Compatibility Utilities
export function getCsrfToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}
