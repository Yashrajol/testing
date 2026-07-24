import { prismaService } from "../services/prisma.service.js";

export const ParentController = {
  async getOverview(req, res) {
    const studentId = String(req.params.studentId || "");

    const studentUser = await prismaService.user.findFirst({
      where: {
        OR: [
          { id: studentId },
          { studentProfile: { id: studentId } },
          { email: studentId },
          { email: "student@vedhkrit.com" },
        ],
      },
      include: {
        studentProfile: {
          include: {
            assessmentResults: { orderBy: { takenAt: "desc" }, take: 1 },
            goals: true,
          },
        },
      },
    }).catch(() => null);

    const studentName = studentUser?.name || "Yash Rajole";
    const grade = studentUser?.studentProfile?.grade || "10th Grade";
    const school = studentUser?.studentProfile?.schoolName || "DPS Bangalore";
    const latestScore = studentUser?.studentProfile?.assessmentResults?.[0]?.overallScore || 82;

    return res.json({
      success: true,
      data: {
        studentId,
        studentName,
        grade,
        school,
        avatar: "/assets/images/student-avatar.png",
        overallPercentage: Math.round(latestScore),
        attendancePercentage: 94,
        homeworkCompletion: 92,
        testAverage: 86,
        confidenceIndex: 78,
        vedhkritIndex: Math.round(latestScore),
        academicAverage: 85,
        assessmentDone: true,
        parentName: "Priya Sharma",
        children: [
          {
            id: studentUser?.studentProfile?.id || studentId || "dev-student-id",
            name: studentName,
            grade,
            school,
            avatar: "/assets/images/student-avatar.png",
            vedhkritIndex: Math.round(latestScore),
            attendance: 94,
            academicAvg: 85,
            goals: studentUser?.studentProfile?.goals || [],
          },
        ],
        recentActivities: [
          { id: "act-1", title: "Homework Submitted", desc: "Mathematics: Calculus Practice Sheet", time: "1h ago", category: "academic" },
          { id: "act-2", title: "Science Test Completed", desc: "Scored 18/20 in Physics Quiz 2", time: "3h ago", category: "academic" },
          { id: "act-3", title: "Attendance Marked", desc: "Marked Present at 8:30 AM today", time: "5h ago", category: "attendance" },
        ],
        upcomingEvents: [
          { id: "ev-1", date: "May 22", time: "10:00 AM", title: "Science Test", cat: "Assessment", action: "View Prep Guide" },
          { id: "ev-2", date: "May 23", time: "04:00 PM", title: "PTM Meeting", cat: "Meeting", action: "Confirm Attendance" },
        ],
        recentAlerts: ["Math quiz result published", "Attendance 100% this week"],
      },
    });
  },

  async getAttendance(req, res) {
    const studentId = String(req.params.studentId || "");
    return res.json({
      success: true,
      data: {
        studentId,
        totalDays: 120,
        presentDays: 113,
        absentDays: 5,
        leaveDays: 2,
        percentage: 94.1,
        monthlyRecord: [{ month: "May", present: 22, total: 24 }],
      },
    });
  },

  async getAcademics(req, res) {
    const studentId = String(req.params.studentId || "");
    return res.json({
      success: true,
      data: {
        studentId,
        overallGrade: "A",
        gpa: 3.8,
        subjects: [
          { subject: "Mathematics", score: 92, grade: "A" },
          { subject: "Science", score: 88, grade: "A-" },
        ],
      },
    });
  },

  async getAssignments(req, res) {
    return res.json({
      success: true,
      data: [
        { id: "as-1", title: "Algebra Equations Set 3", subject: "Mathematics", dueDate: "2026-07-28", status: "COMPLETED", score: 95 },
      ],
    });
  },

  async getAssessments(req, res) {
    return res.json({
      success: true,
      data: [
        { id: "ass-1", title: "Mid-Term Diagnostic Test", score: 88, totalScore: 100, takenAt: "2026-07-20", percentile: 90 },
      ],
    });
  },

  async getGrowth(req, res) {
    return res.json({
      success: true,
      data: {
        score: 820,
        tier: "GOLD",
        growthRate: 4.5,
        strengths: ["Logical Deduction", "Problem Solving"],
      },
    });
  },

  async getNotifications(req, res) {
    return res.json({
      success: true,
      data: [
        { id: "n-1", title: "Parent-Teacher Meeting", content: "Scheduled for Friday at 4 PM", createdAt: new Date().toISOString(), isRead: false },
      ],
    });
  },
};
