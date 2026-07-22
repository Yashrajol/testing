import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentPortalService {
  constructor(private prisma: PrismaService) {}

  async getStudentOverview(studentId: string) {
    const student = await this.prisma.studentProfile.findUnique({
      where: { id: studentId },
      include: {
        user: { select: { name: true, email: true } },
      }
    });

    if (!student) {
      throw new NotFoundException('Student profile not found');
    }

    // Fetch related overview data (e.g., recent assessments, goals, upcoming sessions)
    const recentAssessments = await this.prisma.assessmentResult.findMany({
      where: { studentId },
      orderBy: { takenAt: 'desc' },
      take: 3,
    });

    const activeGoals = await this.prisma.goal.findMany({
      where: { studentId, status: 'ON_TRACK' },
      take: 3,
    });

    return {
      student,
      recentAssessments,
      activeGoals,
    };
  }
}
