import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from '../auth/security/decorators/auth.decorator';
import { CurrentUser } from '../auth/security/decorators/current-user.decorator';
import { AuthenticatedUser } from '../auth/security/interfaces/authenticated-user.interface';
import { LearningEntityType } from './constants/learning.constants';

import { CreateLearningEntityDto, UpdateLearningEntityDto } from './application/dtos/learning-request.dto';
import { LearningEntityResponseDto } from './application/dtos/learning-response.dto';
import { CreateLearningEntityCommand } from './application/commands/create-learning-entity.command';
import { UpdateLearningEntityCommand } from './application/commands/update-learning-entity.command';
import { ArchiveLearningEntityCommand } from './application/commands/archive-learning-entity.command';
import { GetLearningEntityQuery } from './application/queries/get-learning-entity.query';
import { ListLearningEntitiesQuery } from './application/queries/list-learning-entities.query';

import { CreateLearningEntityHandler } from './application/handlers/create-learning-entity.handler';
import { UpdateLearningEntityHandler } from './application/handlers/update-learning-entity.handler';
import { ArchiveLearningEntityHandler } from './application/handlers/archive-learning-entity.handler';
import { GetLearningEntityHandler } from './application/handlers/get-learning-entity.handler';
import { ListLearningEntitiesHandler } from './application/handlers/list-learning-entities.handler';

@ApiTags('Learning & Curriculum Management')
@Controller('learning/entities')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class LearningController {
  constructor(
    private readonly createEntityHandler: CreateLearningEntityHandler,
    private readonly updateEntityHandler: UpdateLearningEntityHandler,
    private readonly archiveEntityHandler: ArchiveLearningEntityHandler,
    private readonly getEntityHandler: GetLearningEntityHandler,
    private readonly listEntitiesHandler: ListLearningEntitiesHandler,
  ) {}

  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Learning & Curriculum Entity (Course, Curriculum, Chapter, Topic, Lesson, Objective, Resource)' })
  @ApiResponse({ status: 201, description: 'Entity created successfully', type: LearningEntityResponseDto })
  async create(@Body() dto: CreateLearningEntityDto): Promise<LearningEntityResponseDto> {
    const { result } = await this.createEntityHandler.execute(
      new CreateLearningEntityCommand(dto.entityType, dto),
    );
    return result;
  }

  @Auth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List Learning Entities with hierarchy scoping' })
  @ApiResponse({ status: 200, description: 'Paginated curriculum entities list' })
  async list(
    @Query('entityType') entityType: LearningEntityType = LearningEntityType.COURSE,
    @Query('search') search?: string,
    @Query('subjectId') subjectId?: string,
    @Query('courseId') courseId?: string,
    @Query('curriculumId') curriculumId?: string,
    @Query('chapterId') chapterId?: string,
    @Query('topicId') topicId?: string,
    @Query('lessonId') lessonId?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<{ items: LearningEntityResponseDto[]; total: number }> {
    return this.listEntitiesHandler.execute(
      new ListLearningEntitiesQuery({
        entityType,
        search,
        subjectId,
        courseId,
        curriculumId,
        chapterId,
        topicId,
        lessonId,
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 20,
      }),
    );
  }

  @Auth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Learning Entity by ID and Type' })
  @ApiResponse({ status: 200, description: 'Curriculum entity details', type: LearningEntityResponseDto })
  async getOne(
    @Param('id') id: string,
    @Query('entityType') entityType: LearningEntityType = LearningEntityType.COURSE,
  ): Promise<LearningEntityResponseDto> {
    return this.getEntityHandler.execute(new GetLearningEntityQuery(entityType, id));
  }

  @Auth()
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Learning Entity details' })
  @ApiResponse({ status: 200, description: 'Updated entity details', type: LearningEntityResponseDto })
  async update(
    @Param('id') id: string,
    @Query('entityType') entityType: LearningEntityType = LearningEntityType.COURSE,
    @Body() dto: UpdateLearningEntityDto,
  ): Promise<LearningEntityResponseDto> {
    const { result } = await this.updateEntityHandler.execute(
      new UpdateLearningEntityCommand(entityType, id, dto),
    );
    return result;
  }

  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Archive (soft-delete) Learning Entity' })
  @ApiResponse({ status: 200, description: 'Entity archived' })
  async archive(
    @Param('id') id: string,
    @Query('entityType') entityType: LearningEntityType = LearningEntityType.COURSE,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<{ message: string }> {
    await this.archiveEntityHandler.execute(new ArchiveLearningEntityCommand(entityType, id, user.id));
    return { message: `Learning entity ${id} of type ${entityType} archived successfully.` };
  }
}
