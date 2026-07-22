import { Injectable, Logger, Optional } from '@nestjs/common';
import { EventDispatcher } from '@vedhkrit/events';
import { CacheService } from '@vedhkrit/cache';
import { AssignmentCreatedEvent } from '../../domain/events/assignment-created.event';
import { AssignmentSubmittedEvent } from '../../domain/events/assignment-submitted.event';
import { AssignmentGradedEvent } from '../../domain/events/assignment-graded.event';
import { AssignmentReturnedEvent } from '../../domain/events/assignment-returned.event';
import { AssignmentOverdueEvent } from '../../domain/events/assignment-overdue.event';

@Injectable()
export class AssignmentIntegrationService {
  private readonly logger = new Logger(AssignmentIntegrationService.name);

  constructor(
    @Optional() private readonly eventDispatcher?: EventDispatcher,
    @Optional() private readonly cache?: CacheService,
  ) {}

  async onAssignmentCreated(event: AssignmentCreatedEvent): Promise<void> {
    this.logger.log(`[AssignmentIntegration] Handling AssignmentCreated for assignment ${event.aggregateId}`);
    if (this.eventDispatcher) {
      await this.eventDispatcher.publish(event);
    }
  }

  async onAssignmentSubmitted(event: AssignmentSubmittedEvent): Promise<void> {
    this.logger.log(`[AssignmentIntegration] Handling AssignmentSubmitted for student ${event.studentId}`);

    if (this.eventDispatcher) {
      await this.eventDispatcher.publish(event);
    }

    if (this.cache) {
      // Invalidate student & parent BFF dashboard caches to refresh live learning progress & assignment status
      await this.cache.delete(`bff:student:${event.studentId}`);
      await this.cache.delete(`bff:parent:${event.studentId}`);
      await this.cache.delete(`assignments:pending:${event.studentId}`);
    }
  }

  async onAssignmentGraded(event: AssignmentGradedEvent): Promise<void> {
    this.logger.log(`[AssignmentIntegration] Handling AssignmentGraded for student ${event.studentId} (Score: ${event.score}/${event.totalPoints})`);

    if (this.eventDispatcher) {
      await this.eventDispatcher.publish(event);
    }

    if (this.cache) {
      // Trigger cache clearing for Learning DNA and Growth Engine recalculated scores
      await this.cache.delete(`bff:student:${event.studentId}`);
      await this.cache.delete(`bff:parent:${event.studentId}`);
      await this.cache.delete(`learning-dna:${event.studentId}`);
      await this.cache.delete(`vedhkrit-index:${event.studentId}`);
    }
  }

  async onAssignmentReturned(event: AssignmentReturnedEvent): Promise<void> {
    this.logger.log(`[AssignmentIntegration] Handling AssignmentReturned for submission ${event.aggregateId}`);
    if (this.eventDispatcher) {
      await this.eventDispatcher.publish(event);
    }
  }

  async onAssignmentOverdue(event: AssignmentOverdueEvent): Promise<void> {
    this.logger.warn(`[AssignmentIntegration] Handling AssignmentOverdue for student ${event.studentId}`);
    if (this.eventDispatcher) {
      await this.eventDispatcher.publish(event);
    }
  }
}
