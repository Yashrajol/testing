import { Injectable, Inject } from '@nestjs/common';
import { REPORTING_REPOSITORY_TOKEN } from '../../constants/reporting.constants';
import { IReportingRepository } from '../../repositories/reporting.repository.interface';
import { CreateSnapshotCommand } from '../commands/create-snapshot.command';
import { SnapshotResponseDto } from '../dtos/reporting-response.dto';
import { ReportingMapper } from '../mappers/reporting.mapper';
import { SnapshotCalculatedEvent } from '../../domain/events/snapshot-calculated.event';
import { EventDispatcher } from '@vedhkrit/events';

@Injectable()
export class CreateSnapshotHandler {
  constructor(
    @Inject(REPORTING_REPOSITORY_TOKEN)
    private readonly repo: IReportingRepository,
    private readonly eventDispatcher: EventDispatcher,
  ) {}

  async execute(command: CreateSnapshotCommand): Promise<SnapshotResponseDto> {
    const snap = await this.repo.createSnapshot(command.data);

    await this.eventDispatcher.publish(
      new SnapshotCalculatedEvent(
        snap.id,
        snap.entityType,
        snap.studentId || snap.teacherId || 'UNKNOWN',
        snap.riskLevel,
      ),
    );

    return ReportingMapper.toSnapshotDto(snap);
  }
}
