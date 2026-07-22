import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GoalsService {
  constructor(private prisma: PrismaService) {}

  async getStudentGoals(studentId: string) {
    return this.prisma.goal.findMany({
      where: { studentId },
      orderBy: { targetDate: 'asc' },
    });
  }
}
