export const mockApiResponses = {
  studentAnalytics: {
    kpis: [
      { id: '1', label: 'Academic Average', value: '85%' },
      { id: '2', label: 'Attendance Rate', value: '94%' },
    ],
    growthTrends: [{ month: 'Jan', academics: 80, skills: 85, attendance: 95, overall: 86 }],
  },
  platformDashboard: {
    stats: {
      totalOrganizations: 15,
      activeInstitutions: 14,
      totalStudents: 12500,
      totalMentors: 420,
      totalAdmins: 120,
      platformRevenue: 4280000,
      mrr: 356000,
      monthlyGrowth: 14,
      assessmentCompletion: 88,
      apiHealth: 'healthy',
      serverStatus: 'online',
      databaseStatus: 'connected',
      queueStatus: 'active',
      storageUsage: 45,
    },
    health: {
      databaseHealth: '99.98% OK',
      apiLatencyMs: 42,
      pwaCacheHitRate: 94.1,
      serverUptimeHours: 1420,
      redisQueueActive: true,
      sslValid: true,
      storageUsedGb: 142.5,
      storageMaxGb: 1000,
    },
  },
  exportResult: {
    success: true,
    fileUrl: '/exports/report_2026.pdf',
    fileName: 'report_2026.pdf',
    format: 'pdf',
    exportedAt: new Date().toISOString(),
  },
};
