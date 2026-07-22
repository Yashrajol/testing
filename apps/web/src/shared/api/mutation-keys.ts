export const MUTATION_KEYS = {
  auth: {
    login: ['auth', 'login'] as const,
    register: ['auth', 'register'] as const,
    verifyOtp: ['auth', 'verifyOtp'] as const,
    forgotPassword: ['auth', 'forgotPassword'] as const,
    resetPassword: ['auth', 'resetPassword'] as const,
    logout: ['auth', 'logout'] as const,
  },
  cms: {
    updateSection: ['cms', 'updateSection'] as const,
  },
} as const;
