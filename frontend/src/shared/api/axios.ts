import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { authStore } from './auth-store';
import { ApiError } from '../types/api';
import { getCsrfToken } from '../security/sanitization';

export { ApiError } from '../types/api';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

// UUID / request ID generator for Distributed Tracing & Audit Trails
function generateRequestId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request queue for handling concurrent token refreshes (Refresh Token Rotation)
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// Error mapping configuration for production security
const ERROR_CODE_MAP: Record<string, string> = {
  AUTH_001: 'This email is already registered.',
  AUTH_002: 'The password is too weak. Please use a stronger password.',
  AUTH_003: 'Incorrect email or password. Please try again.',
  AUTH_004: 'Your account has been suspended. Please contact support.',
  AUTH_005: 'Your session has expired. Please log in again.',
  AUTH_006: 'User not found. Please verify the email.',
  AUTH_007: 'The password reset link is invalid or has expired.',
  AUTH_008: 'Invalid OTP code. Please check and try again.',
  AUTH_009: 'The OTP code has expired. Please request a new one.',
  VALIDATION_ERROR: 'Validation failed. Please verify your inputs.',
  FORBIDDEN: "You don't have permission to perform this action.",
  NOT_FOUND: 'The requested resource was not found.',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded. Please wait a moment before trying again.',
  INTERNAL_SERVER_ERROR: 'Something went wrong on our servers. Please try again later.',
};

function parseApiError(error: any): ApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 500;
    const responseData = error.response?.data as any;
    
    let message = 'An unexpected error occurred.';
    let code: string | undefined = undefined;
    let detail: string | undefined = undefined;
    let errors: string[] | undefined = undefined;

    if (responseData && typeof responseData === 'object') {
      code = responseData.code || responseData.errorCode || responseData.data?.code;
      message = responseData.message || responseData.error || message;
      errors = responseData.errors || (responseData.error ? [responseData.error] : undefined);
      
      if (Array.isArray(message)) {
        errors = message;
        message = message.join('. ');
      }
      
      detail = responseData.detail || (errors ? errors.join(', ') : undefined);
    } else {
      message = error.message || message;
    }

    if (code && ERROR_CODE_MAP[code]) {
      message = ERROR_CODE_MAP[code];
    } else if (status === 401) {
      message = ERROR_CODE_MAP.AUTH_005;
    } else if (status === 403) {
      message = ERROR_CODE_MAP.FORBIDDEN;
    } else if (status === 419) {
      message = 'CSRF security token mismatch or session expired.';
    } else if (status === 429) {
      message = ERROR_CODE_MAP.RATE_LIMIT_EXCEEDED;
    } else if (status === 404) {
      message = ERROR_CODE_MAP.NOT_FOUND;
    } else if (status >= 500) {
      message = ERROR_CODE_MAP.INTERNAL_SERVER_ERROR; // Mask internal stack traces for security
    }

    return new ApiError(message, status, code, detail, errors);
  }

  return new ApiError(
    error instanceof Error ? error.message : 'Network error',
    0
  );
}

// Request Interceptor: Auth, CSRF, URL Normalization & Distributed Tracing
apiClient.interceptors.request.use(
  (config) => {
    // URL prefix normalization & double /api/v1 prevention
    if (config.url) {
      const baseURLHasApiV1 = config.baseURL?.endsWith('/api/v1') || config.baseURL?.endsWith('/api/v1/');
      const urlHasApiV1 = config.url.startsWith('/api/v1/') || config.url.startsWith('api/v1/');

      if (baseURLHasApiV1 && urlHasApiV1) {
        config.url = config.url.replace(/^\/?api\/v1/, '');
      } else if (!baseURLHasApiV1 && !urlHasApiV1 && !config.url.startsWith('http://') && !config.url.startsWith('https://')) {
        config.url = config.url.startsWith('/') ? `/api/v1${config.url}` : `/api/v1/${config.url}`;
      }
    }

    const token = authStore.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    config.headers['X-Request-ID'] = generateRequestId();
    config.headers['X-Correlation-ID'] = generateRequestId();
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Unwrap, Toast, Refresh Token Rotation & Error Handling
apiClient.interceptors.response.use(
  (response) => {
    const { data: responseBody } = response;
    
    // Check if there is an explicit toast requested in the response metadata
    if (responseBody && typeof responseBody === 'object') {
      const toastMeta = responseBody.toast || responseBody.meta?.toast;
      if (toastMeta && typeof toastMeta === 'object' && toastMeta.message) {
        const { type = 'info', message } = toastMeta;
        if (type === 'success') toast.success(message);
        else if (type === 'error') toast.error(message);
        else if (type === 'warning') toast.warning(message);
        else toast.info(message);
      }
    }

    // Standard Success Toasting on write operations
    const method = response.config.method?.toUpperCase();
    if (method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      const msg = responseBody?.message;
      if (msg && typeof msg === 'string') {
        toast.success(msg);
      }
    }

    // Envelope Unwrapping: return responseBody.data, responseBody.items, or responseBody if envelope is present
    if (responseBody && typeof responseBody === 'object') {
      if ('success' in responseBody) {
        if (!responseBody.success) {
          const mappedError = new ApiError(
            responseBody.message || 'API Request failed',
            response.status,
            responseBody.code,
            undefined,
            responseBody.errors
          );
          return Promise.reject(mappedError);
        }
        const dataBlock = responseBody.data !== undefined ? responseBody.data : responseBody;
        if (dataBlock && typeof dataBlock === 'object' && Array.isArray(dataBlock.items)) {
          return dataBlock.items;
        }
        return dataBlock;
      }

      // Automatically unwrap paginated/list objects (e.g. NestJS controllers returning { items: [...], total: N })
      if (Array.isArray(responseBody.items)) {
        return responseBody.items;
      }
      if (Array.isArray(responseBody.data)) {
        return responseBody.data;
      }
      if (Array.isArray(responseBody.results)) {
        return responseBody.results;
      }
    }

    return responseBody;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    const status = error.response?.status;

    // 1. Handle 401 Unauthorized -> Refresh Token Rotation
    if (status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = authStore.getRefreshToken();
      if (!refreshToken) {
        handleLogout('Session expired. Please sign in again.');
        const apiError = parseApiError(error);
        return Promise.reject(apiError);
      }

      return new Promise((resolve, reject) => {
        axios
          .post(`${BASE_URL}/auth/refresh`, { refreshToken }, { withCredentials: true })
          .then((res) => {
            const resData = res.data;
            const dataBlock = resData?.success && resData?.data ? resData.data : resData;
            const newAccessToken = dataBlock?.accessToken || dataBlock?.access_token || dataBlock?.data?.accessToken;
            const newRefreshToken = dataBlock?.refreshToken || dataBlock?.refresh_token || dataBlock?.data?.refreshToken;

            if (newAccessToken) {
              const currentUser = authStore.getUser();
              // Store rotated refresh token
              authStore.setSession(
                newAccessToken,
                newRefreshToken || refreshToken,
                currentUser || ({} as any)
              );
              apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              processQueue(null, newAccessToken);
              resolve(apiClient(originalRequest));
            } else {
              throw new Error('Invalid refresh response structure');
            }
          })
          .catch((refreshErr) => {
            processQueue(refreshErr, null);
            handleLogout('Session validation failed. Please sign in again.');
            reject(parseApiError(refreshErr));
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    // 2. Handle 419 CSRF Token Expired -> Retry once
    if (status === 419 && originalRequest && !originalRequest._retryCsrf) {
      originalRequest._retryCsrf = true;
      const newCsrf = getCsrfToken();
      if (newCsrf) {
        originalRequest.headers['X-XSRF-TOKEN'] = newCsrf;
      }
      return apiClient(originalRequest);
    }

    // 3. Parse standard errors and show toasts for non-401 errors
    const apiError = parseApiError(error);

    if (status === 403) {
      toast.error("Access Forbidden: You do not have permission for this action.");
    } else if (status === 429) {
      toast.warning("Rate Limit Exceeded: Please wait a few seconds before retrying.");
    } else if (status !== 401) {
      toast.error(apiError.message);
    }

    return Promise.reject(apiError);
  }
);

function handleLogout(message: string = 'Your session has expired. Please log in again.') {
  authStore.clearSession();
  toast.error(message);
  if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
    window.location.href = '/login';
  }
}

// Backward Compatibility Layer
export function getAuthToken(): string | null {
  return authStore.getAccessToken();
}

export function setAuthSession(token: string, user: any) {
  authStore.setSession(token, authStore.getRefreshToken() || '', user);
}

export function clearAuthSession() {
  authStore.clearSession();
}

export async function authenticatedFetch(path: string, options: any = {}): Promise<any> {
  const config = {
    method: options.method || 'GET',
    url: path,
    data: options.body ? (typeof options.body === 'string' ? JSON.parse(options.body) : options.body) : undefined,
    headers: options.headers,
    ...options,
  };
  return (await apiClient(config)) as any;
}

export async function postJson(path: string, payload: unknown): Promise<any> {
  return (await apiClient.post(path, payload)) as any;
}
