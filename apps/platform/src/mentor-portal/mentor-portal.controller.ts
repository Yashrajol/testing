import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { MentorPortalService } from './mentor-portal.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthService } from '../auth/auth.service';
import { Role } from '@prisma/client';
import { Request } from 'express';

@Controller('mentor-portal')
@UseGuards(AuthGuard, RolesGuard)
export class MentorPortalController {
  constructor(
    private readonly mentorPortalService: MentorPortalService,
    private readonly authService: AuthService,
  ) {}

  @Get(':mentorId/overview')
  @Roles(Role.MENTOR, Role.ADMIN, Role.SUPERADMIN)
  async getOverview(@Param('mentorId') mentorId: string, @Req() req: Request) {
    await this.authService.assertMentorAccess((req as any).user, mentorId);
    return this.mentorPortalService.getMentorOverview(mentorId);
  }
}
