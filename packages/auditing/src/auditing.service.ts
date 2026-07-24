export interface AuditRecord {
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  before?: Record<string, any>;
  after?: Record<string, any>;
  ip?: string;
  organizationId?: string;
  timestamp: Date;
}

export class AuditService {
  private readonly records: AuditRecord[] = [];

  async record(record: AuditRecord): Promise<void> {
    this.records.push(record);
  }

  async getRecords(): Promise<AuditRecord[]> {
    return [...this.records];
  }
}

export const auditService = new AuditService();
