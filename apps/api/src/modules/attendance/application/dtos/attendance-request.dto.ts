import { IsArray, IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttendanceStatus, AttendanceMode, AttendanceType } from '../../constants/attendance.constants';

export class CreateSessionDto {
  @ApiPropertyOptional({ example: 'org-123' })
  @IsOptional()
  @IsString()
  organizationId?: string;

  @ApiPropertyOptional({ example: 'tenant-123' })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty({ enum: AttendanceType, default: AttendanceType.DAILY })
  @IsEnum(AttendanceType)
  type!: AttendanceType;

  @ApiProperty({ example: 'Morning Assembly & Daily Attendance' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'batch-123' })
  @IsOptional()
  @IsString()
  batchId?: string;

  @ApiPropertyOptional({ example: 'subject-123' })
  @IsOptional()
  @IsString()
  subjectId?: string;

  @ApiPropertyOptional({ example: 'class-123' })
  @IsOptional()
  @IsString()
  classId?: string;

  @ApiPropertyOptional({ example: 'teacher-123' })
  @IsOptional()
  @IsString()
  teacherId?: string;

  @ApiPropertyOptional({ example: '2026-07-21T09:00:00Z' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ example: '2026-07-21T09:00:00Z' })
  @IsOptional()
  @IsDateString()
  startTime?: string;

  @ApiPropertyOptional({ example: '2026-07-21T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  endTime?: string;

  @ApiPropertyOptional({ example: 12.9716 })
  @IsOptional()
  @IsNumber()
  geofenceLat?: number;

  @ApiPropertyOptional({ example: 77.5946 })
  @IsOptional()
  @IsNumber()
  geofenceLng?: number;

  @ApiPropertyOptional({ example: 150.0 })
  @IsOptional()
  @IsNumber()
  geofenceRadius?: number;
}

export class MarkAttendanceDto {
  @ApiPropertyOptional({ example: 'session-uuid-123' })
  @IsOptional()
  @IsString()
  sessionId?: string;

  @ApiPropertyOptional({ example: 'student-uuid-123' })
  @IsOptional()
  @IsString()
  studentId?: string;

  @ApiPropertyOptional({ example: 'teacher-uuid-123' })
  @IsOptional()
  @IsString()
  teacherId?: string;

  @ApiPropertyOptional({ example: 'batch-uuid-123' })
  @IsOptional()
  @IsString()
  batchId?: string;

  @ApiPropertyOptional({ example: 'class-uuid-123' })
  @IsOptional()
  @IsString()
  classId?: string;

  @ApiPropertyOptional({ example: 'subject-uuid-123' })
  @IsOptional()
  @IsString()
  subjectId?: string;

  @ApiPropertyOptional({ enum: AttendanceType, default: AttendanceType.DAILY })
  @IsOptional()
  @IsEnum(AttendanceType)
  type?: AttendanceType;

  @ApiProperty({ enum: AttendanceStatus, example: AttendanceStatus.PRESENT })
  @IsEnum(AttendanceStatus)
  status!: AttendanceStatus;

  @ApiPropertyOptional({ enum: AttendanceMode, default: AttendanceMode.MANUAL })
  @IsOptional()
  @IsEnum(AttendanceMode)
  mode?: AttendanceMode;

  @ApiPropertyOptional({ example: '2026-07-21' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ example: 12.9716 })
  @IsOptional()
  @IsNumber()
  locationLat?: number;

  @ApiPropertyOptional({ example: 77.5946 })
  @IsOptional()
  @IsNumber()
  locationLng?: number;

  @ApiPropertyOptional({ example: 'Checked in via Mobile App' })
  @IsOptional()
  @IsString()
  remarks?: string;

  @ApiPropertyOptional({ example: 'qr-token-xyz-123' })
  @IsOptional()
  @IsString()
  qrCode?: string;

  @ApiPropertyOptional({ example: 'biometric-hash-abc' })
  @IsOptional()
  @IsString()
  biometricHash?: string;

  @ApiPropertyOptional({ example: 0.98 })
  @IsOptional()
  @IsNumber()
  verificationScore?: number;
}

export class BulkAttendanceDto {
  @ApiProperty({ type: [MarkAttendanceDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MarkAttendanceDto)
  records!: MarkAttendanceDto[];
}

export class CorrectAttendanceDto {
  @ApiProperty({ enum: AttendanceStatus, example: AttendanceStatus.PRESENT })
  @IsEnum(AttendanceStatus)
  status!: AttendanceStatus;

  @ApiProperty({ example: 'Student was present in laboratory during session' })
  @IsString()
  @IsNotEmpty()
  reason!: string;
}
