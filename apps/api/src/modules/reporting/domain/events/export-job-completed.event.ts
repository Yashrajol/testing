import { DomainEvent, EventMetadata } from '@vedhkrit/events';
import { ExportFormat } from '../../constants/reporting.constants';

export class ExportJobCompletedEvent implements DomainEvent {
  public readonly eventName = 'reporting.export_job_completed';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string, // exportJobId
    public readonly format: ExportFormat,
    public readonly fileUrl: string,
    public readonly requestedBy: string,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}
