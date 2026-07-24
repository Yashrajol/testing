import { prismaService } from "../services/prisma.service.js";

export const StudentController = {
  async getDashboard(req, res) {
    const studentId = String(req.params.studentId || req.user?.userId || "");

    const studentUser = await prismaService.user.findFirst({
      where: {
        OR: [
          { id: studentId },
          { studentProfile: { id: studentId } },
          { email: studentId },
          { role: "STUDENT" },
        ],
      },
      include: {
        studentProfile: {
          include: {
            batch: true,
            goals: true,
            assessmentResults: { orderBy: { takenAt: "desc" }, take: 5 },
            academicRecords: true,
          },
        },
      },
    }).catch(() => null);

    const studentName = studentUser?.name || "Yash Rajole";
    const assessmentResults = studentUser?.studentProfile?.assessmentResults || [];
    const profileGoals = studentUser?.studentProfile?.goals || [];
    const latestScore = assessmentResults[0]?.overallScore || 82;

    const dbNotifications = prismaService.notification?.findMany ? await prismaService.notification.findMany({
      where: { recipientId: studentUser?.id || "dev-user-id" },
      orderBy: { createdAt: "desc" },
      take: 5,
    }).catch(() => []) : [];

    return res.json({
      success: true,
      data: {
        studentId: studentUser?.studentProfile?.id || studentUser?.id || "dev-student-id",
        studentName,
        profile: {
          schoolName: studentUser?.studentProfile?.schoolName || "DPS Bangalore",
          className: studentUser?.studentProfile?.grade || "10th Grade",
          sectionName: "A",
          batchName: studentUser?.studentProfile?.batch?.name || "Foundation A1",
          rollNumber: studentUser?.studentProfile?.rollNumber || "23",
          academicYear: "2026 - 27",
        },
        attendancePercentage: 95.4,
        enrolledCoursesCount: studentUser?.studentProfile?.academicRecords?.length || 3,
        todaysLessons: [
          { title: "Intro to Data Structures & Algorithms", time: "10:00 AM", instructor: "Dr. Sharma" },
          { title: "Linear Algebra & Matrices", time: "02:00 PM", instructor: "Prof. Gupta" },
        ],
        upcomingAssessments: [
          { title: "Mid-Term Physics Assessment", dueDate: "2026-08-01" },
          { title: "AI Discovery Aptitude Test", dueDate: "2026-08-05" },
        ],
        assignmentStatus: {
          pending: 2,
          completed: 15,
          checklist: [
            { id: 1, text: "Complete Math Exercise 4.2 (Quadratic Equations)", done: true },
            { id: 2, text: "Read Physics Chapter 3: Laws of Motion", done: false },
            { id: 3, text: "Submit Chemistry Lab Experiment Report", done: false },
            { id: 4, text: "Prepare slides for History Group Presentation", done: true },
          ],
          revisionGoals: profileGoals.length > 0
            ? profileGoals.map((g, idx) => ({ id: g.id || idx, text: g.title, done: g.status === "COMPLETED" }))
            : [
              { id: 101, text: "Solve 15 previous-year Calculus problems", done: false },
              { id: 102, text: "Review Organic Chemistry reaction mechanisms", done: true },
            ],
        },
        learningDna: { primaryStyle: "VISUAL", masteryScore: Math.round(latestScore) },
        vedhkritIndex: {
          value: Math.min(100, Math.round(latestScore > 100 ? latestScore / 10 : latestScore)),
          score: Math.round(latestScore * 10),
          status: latestScore >= 80 ? "Great Progress" : "Consistent Growth",
          history: [65, 72, 78, 80, Math.round(latestScore)],
          growthRate: 14.2,
        },
        careerMatches: [
          { role: "Full Stack Engineer", matchPercentage: 94 },
          { role: "AI / Machine Learning Engineer", matchPercentage: 91 },
          { role: "Data Scientist", matchPercentage: 88 },
        ],
        recommendations: ["Revise Graph Traversal", "Practice Dynamic Programming", "Review Organic Chemistry"],
        notifications: dbNotifications.length > 0
          ? dbNotifications.map((n) => n.title)
          : ["Assignment 3 evaluated (A+)", "New lesson uploaded", "Parent-Teacher Session scheduled"],
      },
    });
  },

  async getAcademics(req, res) {
    const studentUser = await prismaService.user.findFirst({
      where: { role: "STUDENT" },
      include: { studentProfile: { include: { academicRecords: true } } },
    }).catch(() => null);

    const records = studentUser?.studentProfile?.academicRecords || [];

    return res.json({
      success: true,
      data: {
        subjects: records.length > 0
          ? records.map((r) => ({ name: r.subject || "Mathematics", teacher: "Prof. Gupta", score: r.score || 90, grade: r.grade || "A", attendance: "95%" }))
          : [
            { name: "Mathematics", teacher: "Prof. Gupta", score: 92, grade: "A+", attendance: "96%" },
            { name: "Physics", teacher: "Dr. Sharma", score: 88, grade: "A", attendance: "94%" },
            { name: "Chemistry", teacher: "Dr. Mehta", score: 85, grade: "A", attendance: "92%" },
            { name: "Computer Science", teacher: "Er. Verma", score: 96, grade: "A+", attendance: "98%" },
          ],
        termProgress: { currentTerm: "Term 2", gpa: 3.85, rank: 3 },
      },
    });
  },

  async getAssessments(req, res) {
    const results = await prismaService.assessmentResult.findMany({
      take: 10,
      orderBy: { takenAt: "desc" },
    }).catch(() => []);

    return res.json({
      success: true,
      data: {
        completed: results.length > 0
          ? results.map((r) => ({ id: r.id, name: r.testName || "Diagnostic Test", score: Math.round(r.overallScore), takenAt: r.takenAt, status: "Completed" }))
          : [
            { id: "a1", name: "AI Aptitude & Interest Battery", score: 88, takenAt: "2026-06-15", status: "Completed" },
            { id: "a2", name: "DBDA Verbal & Numerical Battery", score: 84, takenAt: "2026-05-10", status: "Completed" },
          ],
        available: [
          { id: "a3", name: "21st Century Skills & Critical Thinking", duration: "45 mins", category: "Skills" },
          { id: "a4", name: "Big Five Behavioural Profiler", duration: "30 mins", category: "Behaviour" },
        ],
      },
    });
  },

  async getGoals(req, res) {
    const goals = await prismaService.goal.findMany({
      take: 10,
    }).catch(() => []);

    return res.json({
      success: true,
      data: goals.length > 0
        ? goals.map((g) => ({ id: g.id, title: g.title, category: g.category || "Academic", progress: g.progress || 50, targetDate: g.targetDate || "2026-09-30" }))
        : [
          { id: "g1", title: "Master Data Structures & Algorithms", category: "Academic", progress: 75, targetDate: "2026-09-30" },
          { id: "g2", title: "Build SLEC Maker Lab Prototype", category: "Project", progress: 50, targetDate: "2026-10-15" },
        ],
    });
  },

  async getSessions(req, res) {
    return res.json({
      success: true,
      data: {
        upcoming: [
          { id: "s1", mentorName: "Ananya Sharma", topic: "Stream Selection & Career Roadmap", date: "2026-07-28", time: "05:00 PM" },
        ],
        past: [
          { id: "s2", mentorName: "Rajesh Kumar", topic: "Diagnostic Assessment Review", date: "2026-07-10", rating: 5 },
        ],
      },
    });
  },
};
