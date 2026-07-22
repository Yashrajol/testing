import { Injectable, Inject } from '@nestjs/common';
import { ANALYTICS_REPOSITORY_TOKEN } from '../../constants/analytics.constants';
import { IAnalyticsRepository } from '../../repositories/analytics.repository.interface';
import { GetTopicAnalyticsQuery } from '../queries/get-topic-analytics.query';
import { TopicAnalyticsResponseDto } from '../dtos/analytics-response.dto';
import { AnalyticsMapper } from '../mappers/analytics.mapper';

@Injectable()
export class GetTopicAnalyticsHandler {
  constructor(
    @Inject(ANALYTICS_REPOSITORY_TOKEN)
    private readonly repo: IAnalyticsRepository,
  ) {}

  async execute(query: GetTopicAnalyticsQuery): Promise<TopicAnalyticsResponseDto> {
    const entity = await this.repo.getTopicAnalytics(query.topicId);
    return AnalyticsMapper.toTopicDto(entity);
  }
}
