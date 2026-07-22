import { Injectable, Inject } from '@nestjs/common';
import { REPORTING_REPOSITORY_TOKEN } from '../../constants/reporting.constants';
import { IReportingRepository } from '../../repositories/reporting.repository.interface';
import { CreateDashboardCommand } from '../commands/create-dashboard.command';
import { DashboardResponseDto } from '../dtos/reporting-response.dto';
import { ReportingMapper } from '../mappers/reporting.mapper';

@Injectable()
export class CreateDashboardHandler {
  constructor(
    @Inject(REPORTING_REPOSITORY_TOKEN)
    private readonly repo: IReportingRepository,
  ) {}

  async execute(command: CreateDashboardCommand): Promise<DashboardResponseDto> {
    const dashboard = await this.repo.createDashboard({
      organizationId: command.dto.organizationId,
      schoolId: command.dto.schoolId,
      role: command.dto.role,
      title: command.dto.title,
      layoutConfig: command.dto.layoutConfig,
      isDefault: command.dto.isDefault ?? false,
      ownerId: command.ownerId,
    });

    return ReportingMapper.toDashboardDto(dashboard);
  }
}
