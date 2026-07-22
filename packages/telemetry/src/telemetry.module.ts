import { Module, Global } from '@nestjs/common';
import { MetricsService } from './telemetry.service';
import { HealthController } from './health.controller';

@Global()
@Module({
  controllers: [HealthController],
  providers: [MetricsService],
  exports: [MetricsService],
})
export class TelemetryModule {}
