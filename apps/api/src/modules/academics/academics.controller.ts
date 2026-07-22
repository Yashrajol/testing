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
import { AcademicEntityType } from './constants/academics.constants';

import { CreateAcademicEntityDto, UpdateAcademicEntityDto } from './application/dtos/academics-request.dto';
import { AcademicEntityResponseDto } from './application/dtos/academics-response.dto';
import { CreateAcademicEntityCommand } from './application/commands/create-academic-entity.command';
import { UpdateAcademicEntityCommand } from './application/commands/update-academic-entity.command';
import { ArchiveAcademicEntityCommand } from './application/commands/archive-academic-entity.command';
import { GetAcademicEntityQuery } from './application/queries/get-academic-entity.query';
import { ListAcademicEntitiesQuery } from './application/queries/list-academic-entities.query';

import { CreateAcademicEntityHandler } from './application/handlers/create-academic-entity.handler';
import { UpdateAcademicEntityHandler } from './application/handlers/update-academic-entity.handler';
import { ArchiveAcademicEntityHandler } from './application/handlers/archive-academic-entity.handler';
import { GetAcademicEntityHandler } from './application/handlers/get-academic-entity.handler';
import { ListAcademicEntitiesHandler } from './application/handlers/list-academic-entities.handler';

@ApiTags('School & Academics Foundation')
@Controller('academics/entities')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AcademicsController {
  constructor(
    private readonly createEntityHandler: CreateAcademicEntityHandler,
    private readonly updateEntityHandler: UpdateAcademicEntityHandler,
    private readonly archiveEntityHandler: ArchiveAcademicEntityHandler,
    private readonly getEntityHandler: GetAcademicEntityHandler,
    private readonly listEntitiesHandler: ListAcademicEntitiesHandler,
  ) {}

  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Academic Entity (School, Campus, AcademicYear, Term, Class, Section, Subject, Batch, Enrollment)' })
  @ApiResponse({ status: 201, description: 'Academic entity created successfully', type: AcademicEntityResponseDto })
  async create(@Body() dto: CreateAcademicEntityDto): Promise<AcademicEntityResponseDto> {
    const { result } = await this.createEntityHandler.execute(
      new CreateAcademicEntityCommand(dto.entityType, dto),
    );
    return result;
  }

  @Auth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List Academic Entities with multi-level filters' })
  @ApiResponse({ status: 200, description: 'Paginated academic entities list' })
  async list(
    @Query('entityType') entityType: AcademicEntityType = AcademicEntityType.SCHOOL,
    @Query('search') search?: string,
    @Query('organizationId') organizationId?: string,
    @Query('schoolId') schoolId?: string,
    @Query('academicYearId') academicYearId?: string,
    @Query('classId') classId?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<{ items: AcademicEntityResponseDto[]; total: number }> {
    return this.listEntitiesHandler.execute(
      new ListAcademicEntitiesQuery({
        entityType,
        search,
        organizationId,
        schoolId,
        academicYearId,
        classId,
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 20,
      }),
    );
  }

  @Auth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Academic Entity by ID and Type' })
  @ApiResponse({ status: 200, description: 'Academic entity details', type: AcademicEntityResponseDto })
  async getOne(
    @Param('id') id: string,
    @Query('entityType') entityType: AcademicEntityType = AcademicEntityType.SCHOOL,
  ): Promise<AcademicEntityResponseDto> {
    return this.getEntityHandler.execute(new GetAcademicEntityQuery(entityType, id));
  }

  @Auth()
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Academic Entity details' })
  @ApiResponse({ status: 200, description: 'Updated academic entity details', type: AcademicEntityResponseDto })
  async update(
    @Param('id') id: string,
    @Query('entityType') entityType: AcademicEntityType = AcademicEntityType.SCHOOL,
    @Body() dto: UpdateAcademicEntityDto,
  ): Promise<AcademicEntityResponseDto> {
    const { result } = await this.updateEntityHandler.execute(
      new UpdateAcademicEntityCommand(entityType, id, dto),
    );
    return result;
  }

  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Archive (soft-delete) Academic Entity' })
  @ApiResponse({ status: 200, description: 'Academic entity archived' })
  async archive(
    @Param('id') id: string,
    @Query('entityType') entityType: AcademicEntityType = AcademicEntityType.SCHOOL,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<{ message: string }> {
    await this.archiveEntityHandler.execute(new ArchiveAcademicEntityCommand(entityType, id, user.id));
    return { message: `Academic entity ${id} of type ${entityType} archived successfully.` };
  }
}
