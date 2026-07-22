import { ConnectorType } from '../constants/integrations.constants';

export interface IntegrationFilterOptions {
  organizationId?: string;
  tenantId?: string;
  connectorId?: string;
  skip?: number;
  take?: number;
}

export interface WebhookFilterOptions {
  organizationId?: string;
  tenantId?: string;
  isActive?: boolean;
  skip?: number;
  take?: number;
}

export interface ApiKeyFilterOptions {
  organizationId?: string;
  tenantId?: string;
  isActive?: boolean;
  skip?: number;
  take?: number;
}

export interface ConnectorPayload {
  name: string;
  type: ConnectorType;
  category: string;
  description?: string;
}

export interface WebhookPayload {
  url: string;
  events: string[];
  secret: string;
}
