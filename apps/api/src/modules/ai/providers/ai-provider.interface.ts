import { AIResponsePayload } from '../types/ai.types';

export interface IAIProvider {
  generateResponse(prompt: string, config?: any): Promise<AIResponsePayload>;
}
