export const QUERY_KEYS = {
  auth: {
    all: ['auth'] as const,
    currentUser: () => ['auth', 'currentUser'] as const,
  },
  dashboard: {
    all: ['dashboard'] as const,
    student: (studentId?: string) => ['dashboard', 'student', studentId] as const,
    parent: (parentId?: string) => ['dashboard', 'parent', parentId] as const,
    mentor: (mentorId?: string) => ['dashboard', 'mentor', mentorId] as const,
  },
  cms: {
    all: ['cms'] as const,
    page: (slug: string) => ['cms', 'page', slug] as const,
  },
  attendance: {
    all: ['attendance'] as const,
    summary: (studentId?: string) => ['attendance', 'summary', studentId] as const,
  },
  assignments: {
    all: ['assignments'] as const,
    list: (filters?: Record<string, any>) => ['assignments', 'list', filters] as const,
  },
  assessments: {
    all: ['assessments'] as const,
    list: (filters?: Record<string, any>) => ['assessments', 'list', filters] as const,
  },
  notifications: {
    all: ['notifications'] as const,
    list: () => ['notifications', 'list'] as const,
  },
  growth: {
    all: ['growth'] as const,
    index: (studentId?: string) => ['growth', 'index', studentId] as const,
  },
  learningDNA: {
    all: ['learningDNA'] as const,
    profile: (studentId?: string) => ['learningDNA', 'profile', studentId] as const,
  },
} as const;
