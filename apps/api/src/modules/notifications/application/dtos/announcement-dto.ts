import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TargetAudienceRole } from '../../constants/notifications.constants';

export class CreateAnnouncementDto {
  @ApiPropertyOptional({ example: 'org-uuid-123' })
  @IsOptional()
  @IsString()
  organizationId?: string;

  @ApiPropertyOptional({ example: 'school-uuid-123' })
  @IsOptional()
  @IsString()
  schoolId?: string;

  @ApiPropertyOptional({ example: 'class-uuid-123' })
  @IsOptional()
  @IsString()
  classId?: string;

  @ApiPropertyOptional({ example: 'batch-uuid-123' })
  @IsOptional()
  @IsString()
  batchId?: string;

  @ApiPropertyOptional({ example: 'course-uuid-123' })
  @IsOptional()
  @IsString()
  courseId?: string;

  @ApiProperty({ enum: TargetAudienceRole, example: TargetAudienceRole.ALL })
  @IsEnum(TargetAudienceRole)
  targetRole!: TargetAudienceRole;

  @ApiPropertyOptional({ example: 'student-uuid-123' })
  @IsOptional()
  @IsString()
  targetUserId?: string;

  @ApiProperty({ example: 'Annual Tech Symposium 2026 Announcement' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Registration is now open for Vedhkrit Annual Tech Symposium.' })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiPropertyOptional({ example: '2026-08-30T23:59:59Z' })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
