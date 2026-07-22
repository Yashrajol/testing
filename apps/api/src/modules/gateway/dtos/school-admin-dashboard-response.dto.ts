import { ApiProperty } from '@nestjs/swagger';

export class SchoolAdminDashboardResponseDto {
  @ApiProperty({ example: 'school-123' })
  schoolId!: string;

  @ApiProperty({ example: 1250 })
  totalStudents!: number;

  @ApiProperty({ example: 85 })
  totalTeachers!: number;

  @ApiProperty({ example: 94.2 })
  overallAttendanceRate!: number;

  @ApiProperty({ example: 88.0 })
  averageAssessmentPerformance!: number;

  @ApiProperty({ example: { averageVedhkritIndex: 780, monthlyGrowth: 12.5 } })
  growthAnalytics!: any;
}
