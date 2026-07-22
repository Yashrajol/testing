import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AttachmentDto {
  @ApiProperty({ example: 'solution-code.zip' })
  @IsString()
  @IsNotEmpty()
  fileName!: string;

  @ApiProperty({ example: 'https://storage.vedhkrit.com/submissions/solution-code.zip' })
  @IsString()
  @IsNotEmpty()
  fileUrl!: string;

  @ApiProperty({ example: 'application/zip' })
  @IsString()
  @IsNotEmpty()
  fileType!: string;

  @ApiPropertyOptional({ example: 1048576 })
  @IsOptional()
  fileSizeBytes?: number;
}

export class SubmitAssignmentDto {
  @ApiProperty({ example: 'assignment-uuid-123' })
  @IsString()
  @IsNotEmpty()
  assignmentId!: string;

  @ApiProperty({ example: 'student-uuid-123' })
  @IsString()
  @IsNotEmpty()
  studentId!: string;

  @ApiPropertyOptional({ example: '<h1>Project Report</h1><p>Implemented microservices using CQRS architecture.</p>' })
  @IsOptional()
  @IsString()
  richTextContent?: string;

  @ApiPropertyOptional({ example: 'https://my-demo-app.vercel.app' })
  @IsOptional()
  @IsString()
  externalUrl?: string;

  @ApiPropertyOptional({ example: 'https://github.com/student/vedhkrit-assignment' })
  @IsOptional()
  @IsString()
  gitRepositoryUrl?: string;

  @ApiPropertyOptional({ example: 'a1b2c3d4e5f' })
  @IsOptional()
  @IsString()
  gitCommitHash?: string;

  @ApiPropertyOptional({ type: [AttachmentDto] })
  @IsOptional()
  @IsArray()
  attachments?: AttachmentDto[];
}

export class SaveDraftSubmissionDto extends SubmitAssignmentDto {}

export class ResubmitAssignmentDto extends SubmitAssignmentDto {}
