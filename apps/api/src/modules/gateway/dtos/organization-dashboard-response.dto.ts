import { ApiProperty } from '@nestjs/swagger';

export class OrganizationDashboardResponseDto {
  @ApiProperty({ example: 'org-123' })
  organizationId!: string;

  @ApiProperty({ example: 4 })
  totalCampuses!: number;

  @ApiProperty({ example: 5200 })
  totalStudents!: number;

  @ApiProperty({ example: 320 })
  totalStaff!: number;

  @ApiProperty({ example: 93.6 })
  overallAttendancePercentage!: number;

  @ApiProperty({ example: { averageIndex: 792, topCampus: 'Campus Alpha' } })
  orgGrowthMetrics!: any;
}
