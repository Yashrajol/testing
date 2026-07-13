import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get('health')
  getHealth() {
    return {
      status: 'active',
      timestamp: new Date().toISOString(),
      service: 'Vedhkrit Stage-1 Platform Engine',
      environment: process.env.NODE_ENV || 'production',
      architecture: 'NestJS Modular Microservice-Ready Core'
    };
  }

  @Get('analytics/insights')
  getAnalyticsInsights() {
    return {
      overview: 'Data-driven performance metric acceleration engine active.',
      recentExamPredictedScores: [88.5, 91.2, 94.0],
      weaknessMappingAlerts: ['Mechanics Quiz 2 Revision Requested', 'Algebra Trigonometry review required']
    };
  }
}
