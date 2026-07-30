export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    REGISTER_SCHOOL: '/api/v1/auth/register-school',
    REGISTER_MENTOR: '/api/v1/auth/register-mentor',
    VERIFY_OTP: '/api/v1/auth/verify-otp',
    FORGOT_PASSWORD: '/api/v1/auth/forgot-password',
    RESET_PASSWORD: '/api/v1/auth/reset-password',
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
