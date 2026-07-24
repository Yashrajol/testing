export const AiController = {
  async chat(req, res) {
    const { message, role = "student" } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const query = message.toLowerCase();
    let reply = `I'm Veda, your Vedhkrit AI Learning Assistant! I'm here to help you navigate your ${role} portal, track growth goals, and prepare for career pathways.`;

    if (query.includes("math") || query.includes("physics") || query.includes("academic")) {
      reply = "Based on your latest academic report, you're performing strongly in Mathematics (92%) and Physics (88%). I recommend reviewing Calculus Exercise 4.2 to maintain top mastery!";
    } else if (query.includes("career") || query.includes("future") || query.includes("pathway")) {
      reply = "Your AI Aptitude & Interest Battery highlights high logical reasoning and spatial skills! Top matched careers for your profile: 1) Full Stack Engineer (94% fit), 2) AI Research Scientist (91% fit).";
    } else if (query.includes("mentor") || query.includes("session")) {
      reply = "You have an upcoming 1:1 Advisory Session with Ananya Sharma scheduled for July 28th at 05:00 PM. Would you like me to prepare your goal notes for the mentor?";
    } else if (query.includes("assessment") || query.includes("test")) {
      reply = "You have completed 2 of 6 diagnostic batteries in your ILDF battery. The 21st Century Critical Thinking test is ready for you to take next!";
    }

    return res.json({
      success: true,
      data: {
        reply,
        timestamp: new Date().toISOString(),
        suggestions: [
          "Show my career roadmap",
          "What should I study today?",
          "Book a mentor session",
        ],
      },
    });
  },
};
