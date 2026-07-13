import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssessmentsService {
  constructor(private prisma: PrismaService) {}

  async getStudentAssessments(studentId: string) {
    return this.prisma.assessmentResult.findMany({
      where: { studentId },
      orderBy: { takenAt: 'desc' },
    });
  }
}
