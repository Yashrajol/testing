import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CmsService } from './cms.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleName as Role } from '@vedhkrit/database';

@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get(':slug')
  async getPageLayout(@Param('slug') slug: string) {
    return this.cmsService.getPageLayout(slug);
  }

  @Post(':slug/:sectionKey')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  async updateSection(
    @Param('slug') slug: string,
    @Param('sectionKey') sectionKey: string,
    @Body() content: any,
  ) {
    return this.cmsService.updateSection(slug, sectionKey, content);
  }
}
