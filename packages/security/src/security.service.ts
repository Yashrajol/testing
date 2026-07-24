export interface SecurityConfigOptions {
  enableHelmet?: boolean;
  enableCors?: boolean;
  allowedOrigins?: string[];
  maxPayloadSizeMb?: number;
  rateLimitTtlSeconds?: number;
  rateLimitMaxRequests?: number;
}

export class SecurityService {
  getRecommendedOptions(): SecurityConfigOptions {
    return {
      enableHelmet: true,
      enableCors: true,
      allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'],
      maxPayloadSizeMb: 10,
      rateLimitTtlSeconds: 60,
      rateLimitMaxRequests: 100,
    };
  }

  sanitizeInput(input: string): string {
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }
}

export const securityService = new SecurityService();
