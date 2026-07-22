import { Injectable, Inject } from '@nestjs/common';
import { ANALYTICS_REPOSITORY_TOKEN } from '../../constants/analytics.constants';
import { IAnalyticsRepository } from '../../repositories/analytics.repository.interface';
import { GetChapterAnalyticsQuery } from '../queries/get-chapter-analytics.query';
import { ChapterAnalyticsResponseDto } from '../dtos/analytics-response.dto';
import { AnalyticsMapper } from '../mappers/analytics.mapper';

@Injectable()
export class GetChapterAnalyticsHandler {
  constructor(
    @Inject(ANALYTICS_REPOSITORY_TOKEN)
    private readonly repo: IAnalyticsRepository,
  ) {}

  async execute(query: GetChapterAnalyticsQuery): Promise<ChapterAnalyticsResponseDto> {
    const entity = await this.repo.getChapterAnalytics(query.chapterId);
    return AnalyticsMapper.toChapterDto(entity);
  }
}
