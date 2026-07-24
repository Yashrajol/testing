export const SessionsController = {
  async getSessions(req, res) {
    return res.json({
      success: true,
      data: [
        { id: "s1", mentorName: "Ananya Sharma", topic: "Stream Selection & Career Roadmap", date: "2026-07-28", time: "05:00 PM" },
      ],
    });
  },
};
