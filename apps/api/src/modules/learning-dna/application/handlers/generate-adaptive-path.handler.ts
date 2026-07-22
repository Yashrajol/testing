import { Injectable, Inject } from '@nestjs/common';
import { LEARNING_DNA_REPOSITORY_TOKEN, RecommendedActionType } from '../../constants/learning-dna.constants';
import { ILearningDnaRepository } from '../../repositories/learning-dna.repository.interface';
import { GenerateAdaptivePathCommand } from '../commands/generate-adaptive-path.command';
import { AdaptivePathNodeResponseDto } from '../dtos/learning-dna-response.dto';
import { LearningDnaMapper } from '../mappers/learning-dna.mapper';
import { AdaptivePathUpdatedEvent } from '../../domain/events/adaptive-path-updated.event';

@Injectable()
export class GenerateAdaptivePathHandler {
  constructor(
    @Inject(LEARNING_DNA_REPOSITORY_TOKEN)
    private readonly repo: ILearningDnaRepository,
  ) {}

  async execute(command: GenerateAdaptivePathCommand): Promise<{ result: AdaptivePathNodeResponseDto[]; event: AdaptivePathUpdatedEvent }> {
    const defaultNodes = [
      {
        studentId: command.studentId,
        topicId: 'topic-dp-1',
        recommendedAction: RecommendedActionType.CONCEPT_VIDEO,
        priority: 1,
        status: 'PENDING',
      },
      {
        studentId: command.studentId,
        topicId: 'topic-dp-2',
        recommendedAction: RecommendedActionType.PRACTICE_QUIZ,
        priority: 2,
        status: 'PENDING',
      },
      {
        studentId: command.studentId,
        topicId: 'topic-graphs-1',
        recommendedAction: RecommendedActionType.REVISION,
        priority: 3,
        status: 'PENDING',
      },
    ];

    const created = await this.repo.createAdaptiveNodes(defaultNodes);
    const event = new AdaptivePathUpdatedEvent(command.studentId, created.length);

    return {
      result: created.map((n) => LearningDnaMapper.toNodeDto(n)),
      event,
    };
  }
}
