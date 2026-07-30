import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postJson } from '@/shared/api/axios';
import { authStore } from '@/shared/api/auth-store';
import { API_ENDPOINTS } from '@/shared/api/endpoints';

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      postJson(API_ENDPOINTS.AUTH.LOGIN, credentials),
    onSuccess: (data) => {
      const accessToken = data.accessToken || data.access_token;
      const refreshToken = data.refreshToken || data.refresh_token || '';
      authStore.setSession(accessToken, refreshToken, data.user);
      queryClient.invalidateQueries();
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (payload: { email: string; password: string; name: string; role?: string }) =>
      postJson(API_ENDPOINTS.AUTH.REGISTER, payload),
  });
}

export function useRegisterSchoolMutation() {
  return useMutation({
    mutationFn: (payload: {
      schoolName: string;
      board?: string;
      studentStrength?: string;
      city?: string;
      state?: string;
      contactName: string;
      designation?: string;
      email: string;
      phone?: string;
      password: string;
      interests?: string[];
    }) => postJson(API_ENDPOINTS.AUTH.REGISTER_SCHOOL, payload),
  });
}

export function useRegisterMentorMutation() {
  return useMutation({
    mutationFn: (payload: {
      fullName: string;
      email: string;
      phone?: string;
      city?: string;
      linkedin?: string;
      domain?: string;
      qualification?: string;
      experience?: string;
      organization?: string;
      availability?: string;
      targetGrades?: string[];
      bio?: string;
      password: string;
    }) => postJson(API_ENDPOINTS.AUTH.REGISTER_MENTOR, payload),
  });
}

export function useVerifyOtpMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { email: string; otpCode: string }) => 
      postJson(API_ENDPOINTS.AUTH.VERIFY_OTP, payload),
    onSuccess: (data) => {
      const accessToken = data.accessToken || data.access_token;
      const refreshToken = data.refreshToken || data.refresh_token || '';
      authStore.setSession(accessToken, refreshToken, data.user);
      queryClient.invalidateQueries();
    },
  });
}

