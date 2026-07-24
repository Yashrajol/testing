export const AssessmentController = {
  async getAssessments(req, res) {
    return res.json({
      success: true,
      data: [
        {
          id: "ass-1",
          title: "AI Aptitude & Interest Battery",
          description: "Comprehensive evaluation of logical reasoning, spatial orientation, and technical affinities.",
          category: "Cognitive",
          durationMinutes: 45,
          totalQuestions: 30,
          status: "AVAILABLE",
        },
        {
          id: "ass-2",
          title: "DBDA Verbal & Numerical Battery",
          description: "Measures verbal fluency, numerical computation skills, and abstract reasoning.",
          category: "Aptitude",
          durationMinutes: 60,
          totalQuestions: 40,
          status: "COMPLETED",
        },
        {
          id: "ass-3",
          title: "21st Century Skills & Critical Thinking",
          description: "Evaluates problem solving, collaboration style, and creative adaptability.",
          category: "Skills",
          durationMinutes: 30,
          totalQuestions: 25,
          status: "AVAILABLE",
        },
      ],
    });
  },

  async getAssessmentById(req, res) {
    const { id } = req.params;
    return res.json({
      success: true,
      data: {
        id,
        title: "AI Aptitude & Interest Battery",
        description: "Evaluation of logical reasoning, spatial orientation, and technical affinities.",
        questions: [
          { id: "q1", prompt: "Which pattern logically completes the sequence?", options: ["A", "B", "C", "D"] },
          { id: "q2", prompt: "If all P are Q and some Q are R, which must be true?", options: ["Option 1", "Option 2", "Option 3", "Option 4"] },
        ],
      },
    });
  },

  async submitAssessment(req, res) {
    return res.json({
      success: true,
      data: {
        attemptId: "att-101",
        overallScore: 88,
        percentile: 94,
        status: "COMPLETED",
        summary: "Excellent performance in logical deduction and computational thinking.",
      },
    });
  },
};
