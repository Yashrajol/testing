import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

  async linkChild(parentId: string, childEmail: string) {
    // Resolve parent
    const parent = await this.prisma.parentProfile.findFirst({
      where: {
        OR: [
          { id: parentId },
          { userId: parentId }
        ]
      }
    });

    if (!parent) {
      throw new NotFoundException('Parent profile not found');
    }

    // Resolve student user & nested profile
    const studentUser = await this.prisma.user.findUnique({
      where: { email: childEmail },
      include: { studentProfile: true }
    });

    if (!studentUser || studentUser.role !== 'STUDENT' || !studentUser.studentProfile) {
      throw new NotFoundException('Student profile with this email not found');
    }

    // Check if student is already linked to a parent
    if (studentUser.studentProfile.parentLinkId) {
      if (studentUser.studentProfile.parentLinkId === parent.id) {
        return { 
          message: 'Child is already linked to your account', 
          child: {
            id: studentUser.studentProfile.id,
            name: studentUser.name,
            grade: studentUser.studentProfile.grade,
            school: studentUser.studentProfile.schoolName || 'Vedhkrit Academy',
          }
        };
      }
      throw new BadRequestException('This student is already linked to another parent account');
    }

    // Link student to parent
    const updatedStudent = await this.prisma.studentProfile.update({
      where: { id: studentUser.studentProfile.id },
      data: { parentLinkId: parent.id },
    });

    return {
      message: 'Child linked successfully',
      child: {
        id: updatedStudent.id,
        name: studentUser.name,
        grade: updatedStudent.grade,
        school: updatedStudent.schoolName || 'Vedhkrit Academy',
      }
    };
  }

  async unlinkChild(parentId: string, childId: string) {
    // Resolve parent
    const parent = await this.prisma.parentProfile.findFirst({
      where: {
        OR: [
          { id: parentId },
          { userId: parentId }
        ]
      }
    });

    if (!parent) {
      throw new NotFoundException('Parent profile not found');
    }

    // Find the student linked to this parent
    const student = await this.prisma.studentProfile.findFirst({
      where: { id: childId, parentLinkId: parent.id }
    });

    if (!student) {
      throw new NotFoundException('Linked student profile not found');
    }

    // Unlink student from parent
    await this.prisma.studentProfile.update({
      where: { id: childId },
      data: { parentLinkId: null },
    });

    return {
      message: 'Child unlinked successfully'
    };
  }
}
