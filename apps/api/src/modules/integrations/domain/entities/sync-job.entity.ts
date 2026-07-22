import { SyncStatus } from '../../constants/integrations.constants';

export interface SyncJobProps {
  id: string;
  integrationId: string;
  status: SyncStatus;
  recordsSynced: number;
  errorMessage?: string | null;
  startedAt: Date;
  completedAt?: Date | null;
  createdAt: Date;
}

export class SyncJobEntity {
  constructor(private readonly props: SyncJobProps) {}

  get id(): string { return this.props.id; }
  get integrationId(): string { return this.props.integrationId; }
  get status(): SyncStatus { return this.props.status; }
  get recordsSynced(): number { return this.props.recordsSynced; }
  get errorMessage(): string | null | undefined { return this.props.errorMessage; }
  get startedAt(): Date { return this.props.startedAt; }
  get completedAt(): Date | null | undefined { return this.props.completedAt; }
  get createdAt(): Date { return this.props.createdAt; }
}
