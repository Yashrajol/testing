import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async getStudentSessions(studentId: string) {
    return this.prisma.mentorSession.findMany({
      where: { studentId },
      include: {
        mentor: {
          include: { user: { select: { name: true } } }
        }
      },
      orderBy: { scheduledAt: 'asc' },
    });
  }
}
