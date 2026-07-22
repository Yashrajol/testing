import { IsArray, IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LearningEntityType, ResourceType, BloomsTaxonomy, DifficultyLevel } from '../../constants/learning.constants';

export class CreateLearningEntityDto {
  @ApiProperty({ enum: LearningEntityType, example: LearningEntityType.COURSE })
  @IsEnum(LearningEntityType)
  entityType!: LearningEntityType;

  @ApiProperty({ example: 'Advanced Physics 101' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'Comprehensive guide to mechanics and optics' })
  @IsOptional()
  @IsString()
  description?: string;

  // Course specific
  @ApiPropertyOptional({ example: 'subject-uuid-123' })
  @IsOptional()
  @IsString()
  subjectId?: string;

  @ApiPropertyOptional({ example: 'CRS-PHYS-101' })
  @IsOptional()
  @IsString()
  code?: string;

  // Hierarchy IDs
  @ApiPropertyOptional({ example: 'course-uuid-123' })
  @IsOptional()
  @IsString()
  courseId?: string;

  @ApiPropertyOptional({ example: 'curriculum-uuid-123' })
  @IsOptional()
  @IsString()
  curriculumId?: string;

  @ApiPropertyOptional({ example: 'chapter-uuid-123' })
  @IsOptional()
  @IsString()
  chapterId?: string;

  @ApiPropertyOptional({ example: 'topic-uuid-123' })
  @IsOptional()
  @IsString()
  topicId?: string;

  @ApiPropertyOptional({ example: 'lesson-uuid-123' })
  @IsOptional()
  @IsString()
  lessonId?: string;

  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  sequence?: number;

  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  version?: number;

  // Lesson Objective specific
  @ApiPropertyOptional({ enum: BloomsTaxonomy, default: BloomsTaxonomy.KNOWLEDGE })
  @IsOptional()
  @IsEnum(BloomsTaxonomy)
  bloomsTaxonomy?: BloomsTaxonomy;

  @ApiPropertyOptional({ enum: DifficultyLevel, default: DifficultyLevel.MEDIUM })
  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficulty?: DifficultyLevel;

  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  @IsInt()
  @Min(1)
  estimatedMinutes?: number;

  @ApiPropertyOptional({ example: ['Analytical Thinking', 'Problem Solving'] })
  @IsOptional()
  @IsArray()
  skills?: string[];

  @ApiPropertyOptional({ example: ['Kinematics mastery'] })
  @IsOptional()
  @IsArray()
  competencies?: string[];

  @ApiPropertyOptional({ example: ['Basic Algebra'] })
  @IsOptional()
  @IsArray()
  prerequisites?: string[];

  // Resource specific
  @ApiPropertyOptional({ enum: ResourceType, example: ResourceType.PDF })
  @IsOptional()
  @IsEnum(ResourceType)
  type?: ResourceType;

  @ApiPropertyOptional({ example: 'https://cdn.vedhkrit.com/docs/physics.pdf' })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiPropertyOptional({ example: { fileSizeMb: 12.5 } })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class UpdateLearningEntityDto {
  @ApiPropertyOptional({ example: 'Updated Physics Chapter' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  @Min(1)
  version?: number;

  @ApiPropertyOptional({ example: 'PUBLISHED' })
  @IsOptional()
  @IsString()
  status?: string;
}
