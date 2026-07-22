import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './telemetry.service';

@Controller('health')
export class HealthController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  check() {
    const memory = process.memoryUsage();
    return {
      status: 'ok',
      info: {
        memory: {
          status: memory.heapUsed < 300 * 1024 * 1024 ? 'up' : 'down',
          heapUsedMb: Math.round(memory.heapUsed / 1024 / 1024),
        },
      },
    };
  }

  @Get('liveness')
  liveness() {
    return { status: 'UP', timestamp: new Date().toISOString() };
  }

  @Get('readiness')
  readiness() {
    return { status: 'READY', timestamp: new Date().toISOString() };
  }

  @Get('metrics')
  async metrics() {
    return this.metricsService.getMetrics();
  }
}
