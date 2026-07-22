import { Injectable, Logger } from '@nestjs/common';
import { IAIProvider } from './ai-provider.interface';
import { AIResponsePayload } from '../types/ai.types';
import { AIProviderType } from '../constants/ai.constants';

@Injectable()
export class AzureOpenAIProvider implements IAIProvider {
  private readonly logger = new Logger(AzureOpenAIProvider.name);

  async generateResponse(prompt: string, config?: any): Promise<AIResponsePayload> {
    const startTime = Date.now();
    this.logger.log(`[AzureOpenAIProvider] Generating response using model ${config?.model || 'azure-gpt-4o'}`);

    return {
      content: `[AzureOpenAI Response] Based on the context: "${prompt.substring(0, 100)}...", here is the structured output.`,
      inputTokens: 125,
      outputTokens: 245,
      latencyMs: Date.now() - startTime,
      cost: 0.00310,
      provider: AIProviderType.AZURE_OPENAI,
      model: config?.model || 'azure-gpt-4o',
    };
  }
}
