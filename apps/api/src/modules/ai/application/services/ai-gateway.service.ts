import { Injectable, Logger, Inject } from '@nestjs/common';
import { AIProviderType, PromptType, AI_REPOSITORY_TOKEN } from '../../constants/ai.constants';
import { IAIRepository } from '../../repositories/ai.repository.interface';
import { OpenAIProvider } from '../../providers/openai.provider';
import { GeminiProvider } from '../../providers/gemini.provider';
import { AnthropicProvider } from '../../providers/anthropic.provider';
import { AzureOpenAIProvider } from '../../providers/azure-openai.provider';
import { PromptTemplates } from '../../prompts/prompt-templates';
import { AIResponsePayload } from '../../types/ai.types';

@Injectable()
export class AIGatewayService {
  private readonly logger = new Logger(AIGatewayService.name);

  constructor(
    @Inject(AI_REPOSITORY_TOKEN)
    private readonly repo: IAIRepository,
    private readonly openAi: OpenAIProvider,
    private readonly gemini: GeminiProvider,
    private readonly anthropic: AnthropicProvider,
    private readonly azureOpenAi: AzureOpenAIProvider,
  ) {}

  async executePrompt(
    promptType: PromptType,
    variables: Record<string, any>,
    options?: {
      provider?: AIProviderType;
      userId?: string;
      organizationId?: string;
      tenantId?: string;
    },
  ): Promise<AIResponsePayload> {
    const provider = options?.provider || AIProviderType.GEMINI;
    const prompt = PromptTemplates.getTemplate(promptType, variables);

    this.logger.log(`[AIGateway] Routing prompt ${promptType} to provider ${provider}`);

    // Create prompt request log
    const request = await this.repo.createRequest({
      organizationId: options?.organizationId,
      tenantId: options?.tenantId,
      provider,
      model: this.getDefaultModel(provider),
      promptType,
      userId: options?.userId,
    });

    let result: AIResponsePayload;
    switch (provider) {
      case AIProviderType.OPENAI:
        result = await this.openAi.generateResponse(prompt, { model: 'gpt-4o' });
        break;
      case AIProviderType.ANTHROPIC:
        result = await this.anthropic.generateResponse(prompt, { model: 'claude-3-5-sonnet' });
        break;
      case AIProviderType.AZURE_OPENAI:
        result = await this.azureOpenAi.generateResponse(prompt, { model: 'azure-gpt-4o' });
        break;
      case AIProviderType.GEMINI:
      default:
        result = await this.gemini.generateResponse(prompt, { model: 'gemini-1.5-pro' });
        break;
    }

    // Persist response log
    await this.repo.createResponse({
      requestId: request.id,
      organizationId: options?.organizationId,
      tenantId: options?.tenantId,
      content: result.content,
      outputTokens: result.outputTokens,
      latencyMs: result.latencyMs,
      cost: result.cost,
    });

    // Update request with actual input tokens and costs
    await this.repo.updateRequestCost(request.id, result.inputTokens, result.cost);

    return result;
  }

  private getDefaultModel(provider: AIProviderType): string {
    switch (provider) {
      case AIProviderType.OPENAI:
        return 'gpt-4o';
      case AIProviderType.ANTHROPIC:
        return 'claude-3-5-sonnet';
      case AIProviderType.AZURE_OPENAI:
        return 'azure-gpt-4o';
      case AIProviderType.GEMINI:
      default:
        return 'gemini-1.5-pro';
    }
  }
}
