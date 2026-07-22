import { Injectable, Inject } from '@nestjs/common';
import { REPORTING_REPOSITORY_TOKEN, ScheduleFrequency } from '../../constants/reporting.constants';
import { IReportingRepository } from '../../repositories/reporting.repository.interface';
import { CreateReportCommand } from '../commands/create-report.command';
import { ReportResponseDto } from '../dtos/reporting-response.dto';
import { ReportingMapper } from '../mappers/reporting.mapper';
import { ReportGeneratedEvent } from '../../domain/events/report-generated.event';
import { EventDispatcher } from '@vedhkrit/events';

@Injectable()
export class CreateReportHandler {
  constructor(
    @Inject(REPORTING_REPOSITORY_TOKEN)
    private readonly repo: IReportingRepository,
    private readonly eventDispatcher: EventDispatcher,
  ) {}

  async execute(command: CreateReportCommand): Promise<ReportResponseDto> {
    const report = await this.repo.createReport({
      organizationId: command.dto.organizationId,
      tenantId: command.dto.tenantId,
      type: command.dto.type,
      title: command.dto.title,
      description: command.dto.description,
      config: command.dto.config,
      filters: command.dto.filters,
      isScheduled: command.dto.isScheduled ?? false,
      frequency: command.dto.frequency ?? ScheduleFrequency.ONE_TIME,
      cronExpression: command.dto.cronExpression,
      recipients: command.dto.recipients ?? [],
      authorId: command.authorId,
    });

    await this.eventDispatcher.publish(
      new ReportGeneratedEvent(report.id, report.type, report.authorId, new Date()),
    );

    return ReportingMapper.toReportDto(report);
  }
}
