import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ParentPortalService } from './parent-portal.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthService } from '../auth/auth.service';
import { Role } from '@prisma/client';
import { Request } from 'express';

@Controller('parent-portal')
@UseGuards(AuthGuard, RolesGuard)
export class ParentPortalController {
  constructor(
    private readonly parentPortalService: ParentPortalService,
    private readonly authService: AuthService,
  ) {}

  @Get(':parentId/overview')
  @Roles(Role.PARENT, Role.ADMIN, Role.SUPERADMIN)
  async getOverview(@Param('parentId') parentId: string, @Req() req: Request) {
    await this.authService.assertParentAccess((req as any).user, parentId);
    return this.parentPortalService.getParentOverview(parentId);
  }
}
