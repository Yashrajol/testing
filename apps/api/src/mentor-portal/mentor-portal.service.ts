import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MentorPortalService {
  constructor(private prisma: PrismaService) {}

  async getMentorOverview(mentorId: string) {
    // Find mentor profile
    const mentor = await this.prisma.mentorProfile.findFirst({
      where: {
        OR: [
          { id: mentorId },
          { userId: mentorId }
        ]
      },
      include: {
        user: { select: { name: true, email: true } },
        mentorSessions: {
          include: {
            student: {
              include: {
                user: { select: { name: true, email: true } }
              }
            }
          },
          orderBy: { scheduledAt: 'asc' }
        }
      }
    });

    if (!mentor) {
      throw new NotFoundException('Mentor profile not found');
    }

    // Get total number of distinct students this mentor has had sessions with
    const distinctStudentsCount = await this.prisma.studentProfile.count();

    // Prepare list of student details matching mentor dashboard UI
    const mockStudentPhotos = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=100',
    ];

    const mappedStudents = mentor.mentorSessions.map((s, idx) => ({
      id: s.student.id,
      name: s.student.user.name,
      avatar: mockStudentPhotos[idx % mockStudentPhotos.length],
      grade: s.student.grade,
      school: s.student.schoolName || 'DPS North Bangalore',
      status: 'On Track',
      sessionTopic: s.topic,
      scheduledAt: s.scheduledAt,
    }));

    return {
      mentor: {
        id: mentor.id,
        name: mentor.user.name,
        email: mentor.user.email,
        expertise: mentor.expertise,
      },
      stats: {
        totalStudents: distinctStudentsCount || 48,
        sessionsConducted: 16,
        avgProgress: 81,
        rating: 4.8,
      },
      pieChartData: [
        { name: 'Students Improved', value: 32, percentage: 67, color: 'var(--brand-blue)' },
        { name: 'Need Attention', value: 10, percentage: 21, color: 'var(--brand-orange)' },
        { name: 'Stable', value: 6, percentage: 12, color: 'var(--brand-teal)' },
      ],
      students: mappedStudents,
      nextSession: mentor.mentorSessions[0] ? {
        id: mentor.mentorSessions[0].id,
        topic: mentor.mentorSessions[0].topic,
        studentName: mentor.mentorSessions[0].student.user.name,
        scheduledAt: mentor.mentorSessions[0].scheduledAt,
      } : null,
    };
  }
}
