export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_OTP: '/auth/verify-otp',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  PORTALS: {
    STUDENT_OVERVIEW: (id: string) => `/student-portal/${id}/overview`,
    PARENT_OVERVIEW: (id: string) => `/parent-portal/${id}/overview`,
    MENTOR_OVERVIEW: (id: string) => `/mentor-portal/${id}/overview`,
  },
  CMS: {
    PAGE: (slug: string) => `/cms/${slug}`,
    SECTION: (slug: string, sectionKey: string) => `/cms/${slug}/${sectionKey}`,
  },
};
