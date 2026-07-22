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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RoleName } from '@vedhkrit/database';
import { Auth } from '../auth/security/decorators/auth.decorator';
import { CurrentUser } from '../auth/security/decorators/current-user.decorator';
import { AuthenticatedUser } from '../auth/security/interfaces/authenticated-user.interface';

import { CreateOrganizationDto } from './application/dtos/create-organization.dto';
import { UpdateOrganizationDto } from './application/dtos/update-organization.dto';
import { OrganizationResponseDto } from './application/dtos/organization-response.dto';
import { CreateOrganizationCommand } from './application/commands/create-organization.command';
import { UpdateOrganizationCommand } from './application/commands/update-organization.command';
import { ArchiveOrganizationCommand } from './application/commands/archive-organization.command';
import { GetOrganizationQuery } from './application/queries/get-organization.query';
import { ListOrganizationsQuery } from './application/queries/list-organizations.query';

import { CreateOrganizationHandler } from './application/handlers/create-organization.handler';
import { UpdateOrganizationHandler } from './application/handlers/update-organization.handler';
import { ArchiveOrganizationHandler } from './application/handlers/archive-organization.handler';
import { GetOrganizationHandler } from './application/handlers/get-organization.handler';
import { ListOrganizationsHandler } from './application/handlers/list-organizations.handler';
import { OrganizationTenantGuard } from './security/organization-tenant.guard';

@ApiTags('Organizations')
@Controller('organizations')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class OrganizationController {
  constructor(
    private readonly createOrganizationHandler: CreateOrganizationHandler,
    private readonly updateOrganizationHandler: UpdateOrganizationHandler,
    private readonly archiveOrganizationHandler: ArchiveOrganizationHandler,
    private readonly getOrganizationHandler: GetOrganizationHandler,
    private readonly listOrganizationsHandler: ListOrganizationsHandler,
  ) {}

  @Auth({ roles: [RoleName.SUPERADMIN, RoleName.ADMIN] })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new multi-tenant Organization' })
  @ApiResponse({ status: 201, description: 'Organization created successfully', type: OrganizationResponseDto })
  async create(
    @Body() dto: CreateOrganizationDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<OrganizationResponseDto> {
    const { organization } = await this.createOrganizationHandler.execute(
      new CreateOrganizationCommand(
        dto.name,
        dto.slug,
        dto.legalName,
        dto.registrationNumber,
        dto.taxNumber,
        dto.logoUrl,
        dto.website,
        dto.email,
        dto.phone,
        dto.address,
        dto.timezone,
        dto.locale,
        dto.currency,
        user.id,
      ),
    );
    return organization;
  }

  @Auth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List organizations' })
  @ApiResponse({ status: 200, description: 'List of organizations with pagination' })
  async list(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<{ items: OrganizationResponseDto[]; total: number }> {
    return this.listOrganizationsHandler.execute(
      new ListOrganizationsQuery({
        search,
        status: status as any,
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 20,
      }),
    );
  }

  @Auth()
  @UseGuards(OrganizationTenantGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Organization profile by ID or Slug' })
  @ApiResponse({ status: 200, description: 'Organization profile', type: OrganizationResponseDto })
  async getOne(@Param('id') idOrSlug: string): Promise<OrganizationResponseDto> {
    return this.getOrganizationHandler.execute(new GetOrganizationQuery(idOrSlug));
  }

  @Auth({ roles: [RoleName.SUPERADMIN, RoleName.ORGANIZATION_ADMIN] })
  @UseGuards(OrganizationTenantGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Organization profile and settings' })
  @ApiResponse({ status: 200, description: 'Updated organization profile', type: OrganizationResponseDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateOrganizationDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<OrganizationResponseDto> {
    const { organization } = await this.updateOrganizationHandler.execute(
      new UpdateOrganizationCommand(id, dto, user.id),
    );
    return organization;
  }

  @Auth({ roles: [RoleName.SUPERADMIN] })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Archive (soft-delete) Organization' })
  @ApiResponse({ status: 200, description: 'Organization archived successfully' })
  async archive(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<{ message: string }> {
    await this.archiveOrganizationHandler.execute(new ArchiveOrganizationCommand(id, user.id));
    return { message: `Organization ${id} archived successfully.` };
  }
}
