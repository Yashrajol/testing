import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from '../auth/security/decorators/auth.decorator';

import {
  StudentAnalyticsResponseDto,
  SubjectAnalyticsResponseDto,
  TopicAnalyticsResponseDto,
  ChapterAnalyticsResponseDto,
  TeacherAnalyticsResponseDto,
  ClassAnalyticsResponseDto,
} from './application/dtos/analytics-response.dto';

import { GetStudentAnalyticsQuery } from './application/queries/get-student-analytics.query';
import { GetSubjectAnalyticsQuery } from './application/queries/get-subject-analytics.query';
import { GetTopicAnalyticsQuery } from './application/queries/get-topic-analytics.query';
import { GetChapterAnalyticsQuery } from './application/queries/get-chapter-analytics.query';
import { GetTeacherAnalyticsQuery } from './application/queries/get-teacher-analytics.query';
import { GetClassAnalyticsQuery } from './application/queries/get-class-analytics.query';

import { GetStudentAnalyticsHandler } from './application/handlers/get-student-analytics.handler';
import { GetSubjectAnalyticsHandler } from './application/handlers/get-subject-analytics.handler';
import { GetTopicAnalyticsHandler } from './application/handlers/get-topic-analytics.handler';
import { GetChapterAnalyticsHandler } from './application/handlers/get-chapter-analytics.handler';
import { GetTeacherAnalyticsHandler } from './application/handlers/get-teacher-analytics.handler';
import { GetClassAnalyticsHandler } from './application/handlers/get-class-analytics.handler';

@ApiTags('Learning Analytics Engine')
@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly getStudentAnalyticsHandler: GetStudentAnalyticsHandler,
    private readonly getSubjectAnalyticsHandler: GetSubjectAnalyticsHandler,
    private readonly getTopicAnalyticsHandler: GetTopicAnalyticsHandler,
    private readonly getChapterAnalyticsHandler: GetChapterAnalyticsHandler,
    private readonly getTeacherAnalyticsHandler: GetTeacherAnalyticsHandler,
    private readonly getClassAnalyticsHandler: GetClassAnalyticsHandler,
  ) {}

  @Auth()
  @Get('students/:studentId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get comprehensive student learning analytics, heatmaps, & predictive risk score' })
  @ApiResponse({ status: 200, description: 'Student analytics summary', type: StudentAnalyticsResponseDto })
  async getStudentAnalytics(@Param('studentId') studentId: string): Promise<StudentAnalyticsResponseDto> {
    return this.getStudentAnalyticsHandler.execute(new GetStudentAnalyticsQuery(studentId));
  }

  @Auth()
  @Get('students/:studentId/subjects/:subjectId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get subject mastery & quiz performance analytics' })
  @ApiResponse({ status: 200, description: 'Subject analytics summary', type: SubjectAnalyticsResponseDto })
  async getSubjectAnalytics(
    @Param('studentId') studentId: string,
    @Param('subjectId') subjectId: string,
  ): Promise<SubjectAnalyticsResponseDto> {
    return this.getSubjectAnalyticsHandler.execute(new GetSubjectAnalyticsQuery(studentId, subjectId));
  }

  @Auth()
  @Get('topics/:topicId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get topic comprehension & difficulty index analytics' })
  @ApiResponse({ status: 200, description: 'Topic analytics summary', type: TopicAnalyticsResponseDto })
  async getTopicAnalytics(@Param('topicId') topicId: string): Promise<TopicAnalyticsResponseDto> {
    return this.getTopicAnalyticsHandler.execute(new GetTopicAnalyticsQuery(topicId));
  }

  @Auth()
  @Get('chapters/:chapterId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get chapter completion & assessment score analytics' })
  @ApiResponse({ status: 200, description: 'Chapter analytics summary', type: ChapterAnalyticsResponseDto })
  async getChapterAnalytics(@Param('chapterId') chapterId: string): Promise<ChapterAnalyticsResponseDto> {
    return this.getChapterAnalyticsHandler.execute(new GetChapterAnalyticsQuery(chapterId));
  }

  @Auth()
  @Get('teachers/:teacherId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get teacher performance & class engagement analytics' })
  @ApiResponse({ status: 200, description: 'Teacher analytics summary', type: TeacherAnalyticsResponseDto })
  async getTeacherAnalytics(@Param('teacherId') teacherId: string): Promise<TeacherAnalyticsResponseDto> {
    return this.getTeacherAnalyticsHandler.execute(new GetTeacherAnalyticsQuery(teacherId));
  }

  @Auth()
  @Get('classes/:batchId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get class/batch performance analytics & at-risk student count' })
  @ApiResponse({ status: 200, description: 'Class analytics summary', type: ClassAnalyticsResponseDto })
  async getClassAnalytics(@Param('batchId') batchId: string): Promise<ClassAnalyticsResponseDto> {
    return this.getClassAnalyticsHandler.execute(new GetClassAnalyticsQuery(batchId));
  }
}
