export const AnalyticsController = {
  async getOverview(req, res) {
    return res.json({
      success: true,
      data: {
        assessmentCompletionRate: "88%",
        averageVedhkritIndex: 82,
        topCareers: ["AI Engineer", "Data Scientist", "Full Stack Engineer"],
      },
    });
  },
};
