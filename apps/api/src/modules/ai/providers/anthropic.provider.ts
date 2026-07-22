import { Injectable, Logger } from '@nestjs/common';
import { IAIProvider } from './ai-provider.interface';
import { AIResponsePayload } from '../types/ai.types';
import { AIProviderType } from '../constants/ai.constants';

@Injectable()
export class AnthropicProvider implements IAIProvider {
  private readonly logger = new Logger(AnthropicProvider.name);

  async generateResponse(prompt: string, config?: any): Promise<AIResponsePayload> {
    const startTime = Date.now();
    this.logger.log(`[AnthropicProvider] Generating response using model ${config?.model || 'claude-3-5-sonnet'}`);

    return {
      content: `[Anthropic Claude 3.5 Sonnet Response] Based on the context: "${prompt.substring(0, 100)}...", here is the structured output.`,
      inputTokens: 130,
      outputTokens: 260,
      latencyMs: Date.now() - startTime,
      cost: 0.00425,
      provider: AIProviderType.ANTHROPIC,
      model: config?.model || 'claude-3-5-sonnet',
    };
  }
}
