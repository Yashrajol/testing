import { Provider } from '@nestjs/common';
import { ANALYTICS_REPOSITORY_TOKEN } from './constants/analytics.constants';
import { AnalyticsRepository } from './repositories/analytics.repository';

import { GetStudentAnalyticsHandler } from './application/handlers/get-student-analytics.handler';
import { GetSubjectAnalyticsHandler } from './application/handlers/get-subject-analytics.handler';
import { GetTopicAnalyticsHandler } from './application/handlers/get-topic-analytics.handler';
import { GetChapterAnalyticsHandler } from './application/handlers/get-chapter-analytics.handler';
import { GetTeacherAnalyticsHandler } from './application/handlers/get-teacher-analytics.handler';
import { GetClassAnalyticsHandler } from './application/handlers/get-class-analytics.handler';

export const ANALYTICS_PROVIDERS: Provider[] = [
  AnalyticsRepository,
  {
    provide: ANALYTICS_REPOSITORY_TOKEN,
    useClass: AnalyticsRepository,
  },
  GetStudentAnalyticsHandler,
  GetSubjectAnalyticsHandler,
  GetTopicAnalyticsHandler,
  GetChapterAnalyticsHandler,
  GetTeacherAnalyticsHandler,
  GetClassAnalyticsHandler,
];
