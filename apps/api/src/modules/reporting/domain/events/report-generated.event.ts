import { DomainEvent, EventMetadata } from '@vedhkrit/events';
import { ReportType } from '../../constants/reporting.constants';

export class ReportGeneratedEvent implements DomainEvent {
  public readonly eventName = 'reporting.report_generated';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string, // reportId
    public readonly reportType: ReportType,
    public readonly generatedBy: string,
    public readonly generatedAt: Date,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}
