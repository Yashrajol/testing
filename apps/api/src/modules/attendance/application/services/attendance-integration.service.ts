import { Injectable, Logger, Optional } from '@nestjs/common';
import { EventDispatcher } from '@vedhkrit/events';
import { CacheService } from '@vedhkrit/cache';
import { AttendanceMarkedEvent } from '../../domain/events/attendance-marked.event';
import { LeaveApprovedEvent } from '../../domain/events/leave-approved.event';
import { AttendanceCorrectedEvent } from '../../domain/events/attendance-corrected.event';
import { AttendanceThresholdCrossedEvent } from '../../domain/events/attendance-threshold-crossed.event';

@Injectable()
export class AttendanceIntegrationService {
  private readonly logger = new Logger(AttendanceIntegrationService.name);

  constructor(
    @Optional() private readonly eventDispatcher?: EventDispatcher,
    @Optional() private readonly cache?: CacheService,
  ) {}

  async onAttendanceMarked(event: AttendanceMarkedEvent): Promise<void> {
    this.logger.log(`[AttendanceIntegration] Handling AttendanceMarked for student ${event.studentId}`);

    if (this.eventDispatcher) {
      await this.eventDispatcher.publish(event);
    }

    if (event.studentId && this.cache) {
      // Invalidate student & parent BFF dashboard caches to refresh live attendance index
      await this.cache.delete(`bff:student:${event.studentId}`);
      await this.cache.delete(`bff:parent:${event.studentId}`);
      await this.cache.delete(`attendance:summary:${event.studentId}`);
    }
  }

  async onLeaveApproved(event: LeaveApprovedEvent): Promise<void> {
    this.logger.log(`[AttendanceIntegration] Handling LeaveApproved for applicant ${event.applicantId}`);

    if (this.eventDispatcher) {
      await this.eventDispatcher.publish(event);
    }

    if (this.cache) {
      await this.cache.delete(`bff:student:${event.applicantId}`);
      await this.cache.delete(`bff:parent:${event.applicantId}`);
    }
  }

  async onAttendanceCorrected(event: AttendanceCorrectedEvent): Promise<void> {
    this.logger.log(`[AttendanceIntegration] Handling AttendanceCorrected for record ${event.aggregateId}`);

    if (this.eventDispatcher) {
      await this.eventDispatcher.publish(event);
    }

    if (event.studentId && this.cache) {
      await this.cache.delete(`bff:student:${event.studentId}`);
      await this.cache.delete(`attendance:summary:${event.studentId}`);
    }
  }

  async onThresholdCrossed(event: AttendanceThresholdCrossedEvent): Promise<void> {
    this.logger.warn(
      `[AttendanceIntegration] Attendance Threshold Crossed for student ${event.studentId}: ${event.currentPercentage}% < ${event.thresholdPercentage}%`,
    );

    if (this.eventDispatcher) {
      await this.eventDispatcher.publish(event);
    }
  }
}
