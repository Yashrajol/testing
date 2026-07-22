export class ProviderConfigurationException extends Error {
  constructor(provider: string) {
    super(`Invalid credentials or config for AI provider: ${provider}`);
    this.name = 'ProviderConfigurationException';
  }
}

export class RateLimitExceededException extends Error {
  constructor(message: string = 'AI Platform rate limit reached. Please try again later.') {
    super(message);
    this.name = 'RateLimitExceededException';
  }
}

export class SafetyFilterViolationException extends Error {
  constructor(reason: string) {
    super(`AI Prompt / Response violated safety filter policies: ${reason}`);
    this.name = 'SafetyFilterViolationException';
  }
}

export class ModelNotFoundException extends Error {
  constructor(id: string) {
    super(`Requested AI model record not found: ${id}`);
    this.name = 'ModelNotFoundException';
  }
}
