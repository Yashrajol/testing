import { AIProviderType, PromptType } from '../constants/ai.constants';

export interface ProviderConfig {
  apiKey: string;
  endpoint?: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}

export interface PromptPayload {
  promptType: PromptType;
  variables: Record<string, any>;
  userId?: string;
  organizationId?: string;
  tenantId?: string;
}

export interface AIResponsePayload {
  content: string;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
  cost: number;
  provider: AIProviderType;
  model: string;
}

export interface AIRequestFilterOptions {
  organizationId?: string;
  tenantId?: string;
  userId?: string;
  provider?: string;
  skip?: number;
  take?: number;
}
