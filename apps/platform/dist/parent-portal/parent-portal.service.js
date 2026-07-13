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
exports.ParentPortalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ParentPortalService = class ParentPortalService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getParentOverview(parentId) {
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
            throw new common_1.NotFoundException('Parent profile not found');
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
};
exports.ParentPortalService = ParentPortalService;
exports.ParentPortalService = ParentPortalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ParentPortalService);
