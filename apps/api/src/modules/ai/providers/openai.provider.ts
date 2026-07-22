import { Injectable, Logger } from '@nestjs/common';
import { IAIProvider } from './ai-provider.interface';
import { AIResponsePayload } from '../types/ai.types';
import { AIProviderType } from '../constants/ai.constants';

@Injectable()
export class OpenAIProvider implements IAIProvider {
  private readonly logger = new Logger(OpenAIProvider.name);

  async generateResponse(prompt: string, config?: any): Promise<AIResponsePayload> {
    const startTime = Date.now();
    this.logger.log(`[OpenAIProvider] Generating response using model ${config?.model || 'gpt-4o'}`);

    // Simulated API response for OpenAI
    return {
      content: `[OpenAI gpt-4o Response] Based on the context: "${prompt.substring(0, 100)}...", here is the structured output.`,
      inputTokens: 120,
      outputTokens: 250,
      latencyMs: Date.now() - startTime,
      cost: 0.00315,
      provider: AIProviderType.OPENAI,
      model: config?.model || 'gpt-4o',
    };
  }
}
