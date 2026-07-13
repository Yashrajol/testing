import { Module } from '@nestjs/common';
import { MentorPortalService } from './mentor-portal.service';
import { MentorPortalController } from './mentor-portal.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MentorPortalController],
  providers: [MentorPortalService],
})
export class MentorPortalModule {}
