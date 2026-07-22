import { Injectable, Logger } from '@nestjs/common';
import { IAIProvider } from './ai-provider.interface';
import { AIResponsePayload } from '../types/ai.types';
import { AIProviderType } from '../constants/ai.constants';

@Injectable()
export class GeminiProvider implements IAIProvider {
  private readonly logger = new Logger(GeminiProvider.name);

  async generateResponse(prompt: string, config?: any): Promise<AIResponsePayload> {
    const startTime = Date.now();
    this.logger.log(`[GeminiProvider] Generating response using model ${config?.model || 'gemini-1.5-pro'}`);

    return {
      content: `[Gemini gemini-1.5-pro Response] Based on the context: "${prompt.substring(0, 100)}...", here is the structured output.`,
      inputTokens: 110,
      outputTokens: 280,
      latencyMs: Date.now() - startTime,
      cost: 0.00185,
      provider: AIProviderType.GEMINI,
      model: config?.model || 'gemini-1.5-pro',
    };
  }
}
