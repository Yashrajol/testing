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
import { ProfileType } from './constants/identity.constants';

import { CreateProfileDto, UpdateProfileDto } from './application/dtos/profile-request.dto';
import { ProfileResponseDto } from './application/dtos/profile-response.dto';
import { CreateProfileCommand } from './application/commands/create-profile.command';
import { UpdateProfileCommand } from './application/commands/update-profile.command';
import { ArchiveProfileCommand } from './application/commands/archive-profile.command';
import { GetProfileQuery } from './application/queries/get-profile.query';
import { ListProfilesQuery } from './application/queries/list-profiles.query';

import { CreateProfileHandler } from './application/handlers/create-profile.handler';
import { UpdateProfileHandler } from './application/handlers/update-profile.handler';
import { ArchiveProfileHandler } from './application/handlers/archive-profile.handler';
import { GetProfileHandler } from './application/handlers/get-profile.handler';
import { ListProfilesHandler } from './application/handlers/list-profiles.handler';

@ApiTags('Identity & Profiles')
@Controller('identity/profiles')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class IdentityController {
  constructor(
    private readonly createProfileHandler: CreateProfileHandler,
    private readonly updateProfileHandler: UpdateProfileHandler,
    private readonly archiveProfileHandler: ArchiveProfileHandler,
    private readonly getProfileHandler: GetProfileHandler,
    private readonly listProfilesHandler: ListProfilesHandler,
  ) {}

  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Student/Teacher/Parent/Mentor/Staff profile' })
  @ApiResponse({ status: 201, description: 'Profile created successfully', type: ProfileResponseDto })
  async create(
    @Body() dto: CreateProfileDto,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<ProfileResponseDto> {
    const { profile } = await this.createProfileHandler.execute(
      new CreateProfileCommand(user.id, dto.type, dto),
    );
    return profile;
  }

  @Auth()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile', type: ProfileResponseDto })
  async getMyProfile(
    @CurrentUser() user: AuthenticatedUser,
    @Query('type') type: ProfileType = ProfileType.STUDENT,
  ): Promise<ProfileResponseDto> {
    return this.getProfileHandler.execute(new GetProfileQuery(user.id, type));
  }

  @Auth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List profiles with organization/school filters' })
  @ApiResponse({ status: 200, description: 'Paginated profile list' })
  async list(
    @Query('type') type: ProfileType = ProfileType.STUDENT,
    @Query('search') search?: string,
    @Query('organizationId') organizationId?: string,
    @Query('schoolId') schoolId?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<{ items: ProfileResponseDto[]; total: number }> {
    return this.listProfilesHandler.execute(
      new ListProfilesQuery({
        type,
        search,
        organizationId,
        schoolId,
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 20,
      }),
    );
  }

  @Auth()
  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get profile by target User ID and Profile Type' })
  @ApiResponse({ status: 200, description: 'Profile details', type: ProfileResponseDto })
  async getByUserId(
    @Param('userId') userId: string,
    @Query('type') type: ProfileType = ProfileType.STUDENT,
  ): Promise<ProfileResponseDto> {
    return this.getProfileHandler.execute(new GetProfileQuery(userId, type));
  }

  @Auth()
  @Put(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update target user profile' })
  @ApiResponse({ status: 200, description: 'Updated profile details', type: ProfileResponseDto })
  async update(
    @Param('userId') userId: string,
    @Query('type') type: ProfileType = ProfileType.STUDENT,
    @Body() dto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    const { profile } = await this.updateProfileHandler.execute(
      new UpdateProfileCommand(userId, type, dto),
    );
    return profile;
  }

  @Auth()
  @Delete(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Archive (soft-delete) user profile' })
  @ApiResponse({ status: 200, description: 'Profile archived' })
  async archive(
    @Param('userId') userId: string,
    @Query('type') type: ProfileType = ProfileType.STUDENT,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<{ message: string }> {
    await this.archiveProfileHandler.execute(new ArchiveProfileCommand(userId, type, user.id));
    return { message: `Profile for user ${userId} of type ${type} archived successfully.` };
  }
}
