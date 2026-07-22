import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LeaveStatus, LeaveType } from '../../constants/attendance.constants';

export class ApplyLeaveDto {
  @ApiProperty({ example: 'student-123' })
  @IsString()
  @IsNotEmpty()
  applicantId!: string;

  @ApiPropertyOptional({ example: 'STUDENT', enum: ['STUDENT', 'TEACHER'] })
  @IsOptional()
  @IsString()
  applicantType?: string;

  @ApiProperty({ enum: LeaveType, example: LeaveType.CASUAL })
  @IsEnum(LeaveType)
  leaveType!: LeaveType;

  @ApiProperty({ example: '2026-08-01' })
  @IsDateString()
  startDate!: string;

  @ApiProperty({ example: '2026-08-03' })
  @IsDateString()
  endDate!: string;

  @ApiProperty({ example: 'Family function in hometown' })
  @IsString()
  @IsNotEmpty()
  reason!: string;

  @ApiPropertyOptional({ example: ['https://storage.vedhkrit.com/docs/leave-letter.pdf'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachmentUrls?: string[];
}

export class RejectLeaveDto {
  @ApiProperty({ example: 'Exam scheduled during requested leave period' })
  @IsString()
  @IsNotEmpty()
  rejectionReason!: string;
}

export class CancelLeaveDto {
  @ApiPropertyOptional({ example: 'Plans changed, attending classes' })
  @IsOptional()
  @IsString()
  reason?: string;
}
