import { DomainEvent, EventMetadata } from '@vedhkrit/events';
import { SyncStatus } from '../../constants/integrations.constants';

export class SyncCompletedEvent implements DomainEvent {
  public readonly eventName = 'integrations.sync_completed';
  public readonly metadata: EventMetadata;

  constructor(
    public readonly aggregateId: string, // syncJobId
    public readonly integrationId: string,
    public readonly status: SyncStatus,
    public readonly recordsSynced: number,
  ) {
    this.metadata = {
      eventId: Math.random().toString(36).substring(2),
      version: 1,
      occurredOn: new Date(),
    };
  }
}
