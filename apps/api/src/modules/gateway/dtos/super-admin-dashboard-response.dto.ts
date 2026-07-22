import { ApiProperty } from '@nestjs/swagger';

export class SuperAdminDashboardResponseDto {
  @ApiProperty({ example: 45 })
  totalOrganizations!: number;

  @ApiProperty({ example: 120000 })
  totalSystemUsers!: number;

  @ApiProperty({ example: 'HEALTHY' })
  systemHealthStatus!: string;

  @ApiProperty({ example: { reqPerSec: 1450, avgLatencyMs: 38 } })
  systemTelemetry!: any;
}
