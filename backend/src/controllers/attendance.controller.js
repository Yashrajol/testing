export const AttendanceController = {
  async getHolidaysCalendar(req, res) {
    return res.json({
      success: true,
      data: [
        { id: "h1", date: "2026-08-15", name: "Independence Day", type: "NATIONAL" },
        { id: "h2", date: "2026-10-02", name: "Gandhi Jayanti", type: "NATIONAL" },
        { id: "h3", date: "2026-11-01", name: "Diwali", type: "FESTIVAL" },
      ],
    });
  },
  async getAttendance(req, res) {
    return res.json({
      success: true,
      data: {
        totalDays: 120,
        presentDays: 114,
        absentDays: 6,
        percentage: 95.0,
      },
    });
  },
};
