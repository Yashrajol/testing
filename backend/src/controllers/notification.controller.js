export const NotificationController = {
  async getNotifications(req, res) {
    const userId = req.params.userId || req.user?.userId || "dev-user-id";
    return res.json({
      success: true,
      data: [
        {
          id: "notif-1",
          recipientId: userId,
          title: "Assessment Evaluated",
          message: "Your AI Aptitude & Interest Battery score of 88 has been processed.",
          type: "ASSESSMENT",
          isRead: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: "notif-2",
          recipientId: userId,
          title: "Upcoming 1:1 Session",
          message: "Mentoring session with Ananya Sharma is scheduled for July 28 at 5:00 PM.",
          type: "MENTORING",
          isRead: true,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
        },
      ],
    });
  },

  async markAsRead(req, res) {
    return res.json({ success: true, message: "Notification marked as read" });
  },
};
