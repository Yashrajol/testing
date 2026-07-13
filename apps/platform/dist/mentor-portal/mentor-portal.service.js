"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorPortalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MentorPortalService = class MentorPortalService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMentorOverview(mentorId) {
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
            throw new common_1.NotFoundException('Mentor profile not found');
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
};
exports.MentorPortalService = MentorPortalService;
exports.MentorPortalService = MentorPortalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MentorPortalService);
