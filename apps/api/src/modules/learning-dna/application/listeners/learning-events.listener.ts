import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventDispatcher } from '@vedhkrit/events';
import { RecalculateDnaHandler } from '../handlers/recalculate-dna.handler';
import { RecalculateDnaCommand } from '../commands/recalculate-dna.command';
import { CalculateVedhkritIndexHandler } from '../../../growth/application/handlers/calculate-vedhkrit-index.handler';
import { GenerateCareerRecommendationsHandler } from '../../../growth/application/handlers/generate-career-recommendations.handler';
import { CalculateVedhkritIndexCommand } from '../../../growth/application/commands/calculate-vedhkrit-index.command';
import { GenerateCareerRecommendationsCommand } from '../../../growth/application/commands/generate-career-recommendations.command';

@Injectable()
export class LearningEventsListener implements OnModuleInit {
  constructor(
    private readonly eventDispatcher: EventDispatcher,
    private readonly recalculateDnaHandler: RecalculateDnaHandler,
    private readonly calculateIndexHandler: CalculateVedhkritIndexHandler,
    private readonly generateCareerHandler: GenerateCareerRecommendationsHandler,
  ) {}

  onModuleInit() {
    this.eventDispatcher.subscribe('AssessmentCompleted', async (event: any) => {
      if (event?.studentId) {
        await this.recalculateDnaHandler.execute(new RecalculateDnaCommand(event.studentId));
      }
    });

    this.eventDispatcher.subscribe('LessonCompleted', async (event: any) => {
      if (event?.studentId) {
        await this.recalculateDnaHandler.execute(new RecalculateDnaCommand(event.studentId));
      }
    });

    this.eventDispatcher.subscribe('AttendanceUpdated', async (event: any) => {
      if (event?.studentId) {
        await this.recalculateDnaHandler.execute(new RecalculateDnaCommand(event.studentId));
      }
    });

    this.eventDispatcher.subscribe('AssignmentEvaluated', async (event: any) => {
      if (event?.studentId) {
        await this.recalculateDnaHandler.execute(new RecalculateDnaCommand(event.studentId));
      }
    });

    this.eventDispatcher.subscribe('LearningAnalyticsGenerated', async (event: any) => {
      if (event?.studentId) {
        await this.recalculateDnaHandler.execute(new RecalculateDnaCommand(event.studentId));
      }
    });

    // Integrated Growth Engine Trigger: Whenever Learning DNA updates
    this.eventDispatcher.subscribe('LearningDnaUpdated', async (event: any) => {
      if (event?.aggregateId) {
        await this.calculateIndexHandler.execute(new CalculateVedhkritIndexCommand(event.aggregateId));
        await this.generateCareerHandler.execute(new GenerateCareerRecommendationsCommand(event.aggregateId));
      }
    });
  }
}
