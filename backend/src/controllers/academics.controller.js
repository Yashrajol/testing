export const AcademicsController = {
  async getEntities(req, res) {
    return res.json({
      success: true,
      data: [
        { id: "e1", name: "Mathematics", code: "MATH101", teacher: "Prof. Gupta" },
        { id: "e2", name: "Physics", code: "PHYS101", teacher: "Dr. Sharma" },
        { id: "e3", name: "Chemistry", code: "CHEM101", teacher: "Dr. Mehta" },
      ],
    });
  },
};
