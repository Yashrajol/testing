import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttendanceStatus } from '../../constants/attendance.constants';

export class AttendanceDashboardResponseDto {
  @ApiProperty({ example: '2026-07' })
  period!: string;

  @ApiProperty({ example: 92.5 })
  overallPercentage!: number;

  @ApiProperty({ example: 450 })
  totalStudents!: number;

  @ApiProperty({ example: 416 })
  presentToday!: number;

  @ApiProperty({ example: 18 })
  absentToday!: number;

  @ApiProperty({ example: 10 })
  lateToday!: number;

  @ApiProperty({ example: 6 })
  onLeaveToday!: number;

  @ApiProperty({ example: 12 })
  defaultersCount!: number;

  @ApiProperty({ example: [{ date: '2026-07-21', percentage: 94.2 }] })
  trend!: Array<{ date: string; percentage: number }>;
}

export class DefaulterReportResponseDto {
  @ApiProperty({ example: 'batch-123' })
  batchId?: string;

  @ApiProperty({ example: 75.0 })
  thresholdPercentage!: number;

  @ApiProperty({ example: 5 })
  totalDefaulters!: number;

  @ApiProperty({
    example: [
      {
        studentId: 'std-1',
        studentName: 'Aarav Sharma',
        attendancePercentage: 68.5,
        totalClasses: 40,
        attendedClasses: 27,
        riskLevel: 'HIGH',
      },
    ],
  })
  defaulters!: Array<{
    studentId: string;
    studentName?: string;
    batchId?: string;
    classId?: string;
    attendancePercentage: number;
    totalClasses: number;
    attendedClasses: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  }>;
}

export class HeatmapCellDto {
  @ApiProperty({ example: '2026-07-01' })
  date!: string;

  @ApiProperty({ enum: AttendanceStatus, example: AttendanceStatus.PRESENT })
  status!: AttendanceStatus;

  @ApiPropertyOptional({ example: 95.0 })
  percentage?: number;
}

export class AttendanceHeatmapResponseDto {
  @ApiProperty({ example: 'student-123' })
  entityId!: string;

  @ApiProperty({ example: '2026-07' })
  period!: string;

  @ApiProperty({ type: [HeatmapCellDto] })
  cells!: HeatmapCellDto[];
}
