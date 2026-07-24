export const SuperAdminController = {
  async getDashboard(req, res) {
    return res.json({
      success: true,
      data: {
        totalOrganizations: 18,
        totalAdmins: 42,
        activeSubscriptions: 16,
        monthlyRecurringRevenue: "$124,500",
      },
    });
  },
};
