import { prismaService } from "../services/prisma.service.js";

export const MentorController = {
  async getDashboard(req, res) {
    return res.json({
      success: true,
      data: {
        activeMenteesCount: 24,
        upcomingSessionsCount: 5,
        pendingReportsCount: 2,
        mentees: [
          { id: "m1", name: "Yash Rajole", grade: "10th Grade", stage: "Align Phase", nextSession: "July 28, 5:00 PM" },
          { id: "m2", name: "Aarav Gupta", grade: "11th Grade", stage: "Prepare Phase", nextSession: "July 29, 4:00 PM" },
          { id: "m3", name: "Riya Verma", grade: "9th Grade", stage: "Discover Phase", nextSession: "July 30, 2:00 PM" },
        ],
        alerts: [
          { id: "alt-1", type: "ATTENDANCE_DROP", studentName: "Riya Verma", message: "Attendance dropped to 82% this month" },
        ],
      },
    });
  },

  async getStudents(req, res) {
    return res.json({
      success: true,
      data: [
        { id: "m1", name: "Yash Rajole", grade: "10th Grade", school: "DPS Bangalore", ildfStage: "Align" },
        { id: "m2", name: "Aarav Gupta", grade: "11th Grade", school: "National Public School", ildfStage: "Prepare" },
      ],
    });
  },

  async getSessions(req, res) {
    return res.json({
      success: true,
      data: [
        { id: "s1", studentName: "Yash Rajole", topic: "Stream Selection Roadmap", time: "2026-07-28 17:00", status: "SCHEDULED" },
      ],
    });
  },
};
