export const GrowthController = {
  async getIndex(req, res) {
    return res.json({
      success: true,
      data: {
        value: 82,
        score: 820,
        status: "Great Progress",
        history: [65, 72, 78, 80, 82],
        growthRate: 14.2,
      },
    });
  },

  async getCareers(req, res) {
    return res.json({
      success: true,
      data: [
        { role: "Full Stack Engineer", matchPercentage: 94, category: "Tech" },
        { role: "AI / Machine Learning Engineer", matchPercentage: 91, category: "Tech" },
        { role: "Data Scientist", matchPercentage: 88, category: "Analytics" },
      ],
    });
  },

  async getInsights(req, res) {
    return res.json({
      success: true,
      data: [
        { id: "in-1", title: "Logical Reasoning Surge", description: "Your score improved by +12% after practicing daily graph algorithms.", impact: "HIGH" },
        { id: "in-2", title: "Time Management Optimization", description: "Assessment completion speed increased by 15 minutes.", impact: "MEDIUM" },
      ],
    });
  },

  async getGoals(req, res) {
    return res.json({
      success: true,
      data: [
        { id: "g1", title: "Master Data Structures", category: "Academic", progress: 75 },
        { id: "g2", title: "Public Speaking", category: "Skill", progress: 40 },
      ],
    });
  },

  async createGoal(req, res) {
    return res.json({ success: true, data: { id: "g3", ...req.body } });
  },
};
