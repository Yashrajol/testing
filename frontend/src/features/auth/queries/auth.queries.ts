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

export function useVerifyOtpMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { email: string; otp: string }) => 
      postJson(API_ENDPOINTS.AUTH.VERIFY_OTP, payload),
    onSuccess: (data) => {
      const accessToken = data.accessToken || data.access_token;
      const refreshToken = data.refreshToken || data.refresh_token || '';
      authStore.setSession(accessToken, refreshToken, data.user);
      queryClient.invalidateQueries();
    },
  });
}

