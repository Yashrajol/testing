import { Injectable, Inject } from '@nestjs/common';
import { LEARNING_DNA_REPOSITORY_TOKEN } from '../../constants/learning-dna.constants';
import { ILearningDnaRepository } from '../../repositories/learning-dna.repository.interface';
import { RecalculateDnaCommand } from '../commands/recalculate-dna.command';
import { LearningDnaResponseDto } from '../dtos/learning-dna-response.dto';
import { LearningDnaMapper } from '../mappers/learning-dna.mapper';
import { DnaAlgorithmService } from '../services/dna-algorithm.service';
import { EventDispatcher } from '@vedhkrit/events';

import { LearningDnaUpdatedEvent } from '../../domain/events/learning-dna-updated.event';
import { MasteryCalculatedEvent } from '../../domain/events/mastery-calculated.event';
import { RecommendationGeneratedEvent } from '../../domain/events/recommendation-generated.event';
import { RiskScoreUpdatedEvent } from '../../domain/events/risk-score-updated.event';

@Injectable()
export class RecalculateDnaHandler {
  constructor(
    @Inject(LEARNING_DNA_REPOSITORY_TOKEN)
    private readonly repo: ILearningDnaRepository,
    private readonly algoService: DnaAlgorithmService,
    private readonly eventDispatcher: EventDispatcher,
  ) {}

  async execute(command: RecalculateDnaCommand): Promise<LearningDnaResponseDto> {
    const masteryScore = this.algoService.calculateMasteryScore([85, 90, 80], [88, 92]);
    const retentionScore = this.algoService.calculateRetentionScore(3, 88);
    const risk = this.algoService.predictRiskScore(masteryScore, 92, 0);
    const style = this.algoService.detectLearningStyle(15, 8, 4);

    const weakTopics = ['Dynamic Programming', 'Graph Theory'];
    const strongTopics = ['Arrays', 'Sorting Algorithms'];
    const recommendations = this.algoService.generateRecommendations(weakTopics, risk.riskLevel);

    const updated = await this.repo.upsertDna(command.studentId, {
      primaryLearningStyle: style.primaryStyle,
      preferredMode: style.preferredMode,
      masteryScore,
      growthScore: Math.round(masteryScore * 1.05),
      confidenceScore: 86.0,
      retentionScore,
      riskScore: risk.riskScore,
      knowledgeGraph: {
        weakTopics,
        strongTopics,
      },
      skillProfile: {
        problemSolving: masteryScore,
        analyticalThinking: 88,
      },
      competencyProfile: this.algoService.detectCompetencyGaps({
        Arrays: 92,
        Sorting: 88,
        DP: 55,
      }),
      recommendations,
    });

    // Publish Learning DNA Domain Events
    await this.eventDispatcher.publish(new LearningDnaUpdatedEvent(command.studentId, masteryScore, risk.riskScore));
    await this.eventDispatcher.publish(new MasteryCalculatedEvent(command.studentId, 'default-subject', masteryScore, retentionScore));
    await this.eventDispatcher.publish(new RiskScoreUpdatedEvent(command.studentId, risk.riskScore, risk.riskLevel));

    if (recommendations.length > 0) {
      await this.eventDispatcher.publish(
        new RecommendationGeneratedEvent(command.studentId, recommendations[0].title, recommendations[0].actionType, recommendations[0].priority),
      );
    }

    return LearningDnaMapper.toDnaDto(updated);
  }
}
