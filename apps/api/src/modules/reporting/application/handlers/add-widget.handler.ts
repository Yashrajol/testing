import { Injectable, Inject } from '@nestjs/common';
import { REPORTING_REPOSITORY_TOKEN } from '../../constants/reporting.constants';
import { IReportingRepository } from '../../repositories/reporting.repository.interface';
import { AddWidgetCommand } from '../commands/add-widget.command';
import { WidgetResponseDto } from '../dtos/reporting-response.dto';
import { ReportingMapper } from '../mappers/reporting.mapper';

@Injectable()
export class AddWidgetHandler {
  constructor(
    @Inject(REPORTING_REPOSITORY_TOKEN)
    private readonly repo: IReportingRepository,
  ) {}

  async execute(command: AddWidgetCommand): Promise<WidgetResponseDto> {
    const widget = await this.repo.addWidget(command.dashboardId, {
      title: command.dto.title,
      type: command.dto.type,
      metricKey: command.dto.metricKey,
      chartType: command.dto.chartType,
      gridPosition: command.dto.gridPosition,
      config: command.dto.config,
    });

    return ReportingMapper.toWidgetDto(widget);
  }
}
