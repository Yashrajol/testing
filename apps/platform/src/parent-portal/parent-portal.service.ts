import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParentPortalService {
  constructor(private prisma: PrismaService) {}

  async getParentOverview(parentId: string) {
    // Find parent user profile
    const parent = await this.prisma.parentProfile.findFirst({
      where: {
        OR: [
          { id: parentId },
          { userId: parentId }
        ]
      },
      include: {
        user: { select: { name: true, email: true } },
        children: {
          include: {
            user: { select: { name: true, email: true } },
            assessmentResults: { orderBy: { takenAt: 'desc' }, take: 1 },
            goals: true,
            academicRecords: true,
            mentorSessions: {
              include: {
                mentor: {
                  include: {
                    user: { select: { name: true } }
                  }
                }
              },
              orderBy: { scheduledAt: 'desc' },
              take: 3
            }
          }
        }
      }
    });

    if (!parent) {
      throw new NotFoundException('Parent profile not found');
    }

    // Prepare structure to align with parent portal UI expectations
    return {
      parent,
      children: parent.children.map(child => {
        const latestAssessment = child.assessmentResults[0];
        const academicAvg = child.academicRecords.reduce((sum, r) => sum + r.score, 0) / (child.academicRecords.length || 1);
        
        return {
          id: child.id,
          name: child.user.name,
          grade: child.grade,
          school: child.schoolName || 'Vedhkrit Academy',
          avatar: '/assets/images/student-avatar.png',
          vedhkritIndex: latestAssessment ? latestAssessment.overallScore : 82,
          attendance: 94, // Mock monthly tracking standard
          academicAvg,
          goals: child.goals,
          sessions: child.mentorSessions.map(s => ({
            id: s.id,
            topic: s.topic,
            mentorName: s.mentor.user.name,
            scheduledAt: s.scheduledAt,
            status: s.status,
          })),
        };
      })
    };
  }
}
