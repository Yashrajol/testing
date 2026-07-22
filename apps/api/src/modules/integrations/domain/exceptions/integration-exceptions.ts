export class ConnectorNotFoundException extends Error {
  constructor(id: string) {
    super(`Connector type not found: ${id}`);
    this.name = 'ConnectorNotFoundException';
  }
}

export class IntegrationNotFoundException extends Error {
  constructor(id: string) {
    super(`Integration not found: ${id}`);
    this.name = 'IntegrationNotFoundException';
  }
}

export class WebhookNotFoundException extends Error {
  constructor(id: string) {
    super(`Webhook callback endpoint not found: ${id}`);
    this.name = 'WebhookNotFoundException';
  }
}

export class InvalidApiKeyException extends Error {
  constructor() {
    super('Provided API Key has expired, is suspended, or has invalid signature credentials');
    this.name = 'InvalidApiKeyException';
  }
}

export class WebhookDispatchFailedException extends Error {
  constructor(url: string, error: string) {
    super(`Failed to dispatch payload to registered webhook endpoint ${url}: ${error}`);
    this.name = 'WebhookDispatchFailedException';
  }
}
