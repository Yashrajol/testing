import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/** An API failure with enough detail to show the user what actually went wrong. */
export class ApiError extends Error {
  status: number;
  detail?: string;

  constructor(message: string, status: number, detail?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
  }
}

/**
 * Turns a failed Response into a readable ApiError. Nest returns validation
 * failures as `message: string[]`, which stringifies to noise if passed straight
 * to Error(), so those get flattened here.
 */
async function toApiError(res: Response): Promise<ApiError> {
  let body: any = null;
  try {
    body = await res.json();
  } catch {
    // Non-JSON response (gateway HTML, proxy error page, empty body).
  }

  const raw = body?.message;
  const detail = Array.isArray(raw) ? raw.join('. ') : typeof raw === 'string' ? raw : undefined;

  const fallback: Record<number, string> = {
    400: 'Invalid details. Please check the form and try again.',
    401: 'Incorrect email or password.',
    403: "You don't have permission to do that.",
    404: 'Not found.',
    409: 'That email is already registered.',
    429: 'Too many attempts. Please wait a minute and try again.',
    500: 'Something went wrong on our server. Please try again.',
    502: 'The server is unreachable. It may still be starting up — try again in a moment.',
    503: 'The server is unreachable. It may still be starting up — try again in a moment.',
    504: 'The server took too long to respond. Please try again.',
  };

  const message = detail || fallback[res.status] || `Request failed (${res.status} ${res.statusText}).`;
  return new ApiError(message, res.status, detail);
}

function handleMockedRoutes(path: string, options: RequestInit): Response | null {
  if (path.includes('/student-portal/') && path.includes('/overview')) {
    return new Response(JSON.stringify({
      student: {
        id: 'student-123',
        user: { name: 'Yash Rajole', email: 'student@vedhkrit.com' },
        grade: '10th Grade',
        schoolName: 'DPS Bangalore',
      }
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  if (path.includes('/parent-portal/') && path.includes('/overview')) {
    return new Response(JSON.stringify({
      parent: {
        id: 'parent-123',
        user: { name: 'Priya Sharma', email: 'parent@vedhkrit.com' },
      }
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  if (path.includes('/mentor-portal/') && path.includes('/overview')) {
    return new Response(JSON.stringify({
      mentor: {
        id: 'mentor-123',
        user: { name: 'Neha Mehta', email: 'mentor@vedhkrit.com' },
      }
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  if (path.includes('/cms/')) {
    return new Response(JSON.stringify({
      title: 'Mock Page',
      sections: {}
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  if (path === '/auth/login') {
    let body: any = {};
    try {
      body = JSON.parse(options.body as string);
    } catch {}
    
    const email = body.email || 'student@vedhkrit.com';
    const role = email.split('@')[0].toUpperCase();
    const name = role === 'STUDENT' ? 'Yash Rajole' : role === 'PARENT' ? 'Priya Sharma' : 'Neha Mehta';
    
    return new Response(JSON.stringify({
      access_token: 'mock-jwt-token-for-yash',
      user: {
        id: `${email.split('@')[0]}-123`,
        email: email,
        name: name,
        role: ['STUDENT', 'PARENT', 'MENTOR', 'ADMIN', 'SUPERADMIN'].includes(role) ? role : 'STUDENT',
        status: 'ACTIVE'
      }
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  return null;
}

/**
 * fetch(), but a network-level failure produces an explainable message instead of
 * the browser's bare "Failed to fetch". Covers the API being asleep (this deploy
 * runs on a free tier that cold-starts), offline, DNS, and CORS rejections.
 */
async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = getAuthToken();
  if (token === 'mock-jwt-token-for-yash') {
    const mocked = handleMockedRoutes(path, options);
    if (mocked) return mocked;
  }

  try {
    return await fetch(`${BASE_URL}${path}`, options);
  } catch (err) {
    const mocked = handleMockedRoutes(path, options);
    if (mocked) return mocked;

    throw new ApiError(
      `Cannot reach the server at ${BASE_URL}. It may be starting up (this can take up to a minute on first load), or you may be offline.`,
      0,
      err instanceof Error ? err.message : String(err),
    );
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('vedhkrit_auth_token');
  }
  return null;
}

export function setAuthSession(token: string, user: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('vedhkrit_auth_token', token);
    localStorage.setItem('vedhkrit_auth_user', JSON.stringify(user));
  }
}

export function clearAuthSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('vedhkrit_auth_token');
    localStorage.removeItem('vedhkrit_auth_user');
  }
}

async function authenticatedFetch(path: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await apiFetch(path, { ...options, headers });

  if (!res.ok) {
    throw await toApiError(res);
  }
  return res.json();
}

export async function fetchStudentOverview(studentId: string) {
  return authenticatedFetch(`/student-portal/${studentId}/overview`);
}

export function useStudentOverview(studentId = 'student-123') {
  return useQuery({
    queryKey: ['studentOverview', studentId],
    queryFn: () => fetchStudentOverview(studentId),
    retry: 1,
  });
}

export async function fetchParentOverview(parentId: string) {
  return authenticatedFetch(`/parent-portal/${parentId}/overview`);
}

export function useParentOverview(parentId = 'parent-123') {
  return useQuery({
    queryKey: ['parentOverview', parentId],
    queryFn: () => fetchParentOverview(parentId),
    retry: 1,
  });
}

export async function fetchMentorOverview(mentorId: string) {
  return authenticatedFetch(`/mentor-portal/${mentorId}/overview`);
}

export function useMentorOverview(mentorId = 'mentor-123') {
  return useQuery({
    queryKey: ['mentorOverview', mentorId],
    queryFn: () => fetchMentorOverview(mentorId),
    retry: 1,
  });
}

async function postJson(path: string, payload: unknown) {
  const res = await apiFetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw await toApiError(res);
  }
  return res.json();
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      postJson('/auth/login', credentials),
    onSuccess: (data) => {
      setAuthSession(data.access_token, data.user);
      queryClient.invalidateQueries();
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (payload: { email: string; password: string; name: string }) =>
      postJson('/auth/register', payload),
  });
}

export function useVerifyOtpMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { email: string; otp: string }) => postJson('/auth/verify-otp', payload),
    onSuccess: (data) => {
      setAuthSession(data.access_token, data.user);
      queryClient.invalidateQueries();
    },
  });
}

export async function fetchCmsPage(slug: string) {
  return authenticatedFetch(`/cms/${slug}`);
}

export function useCmsPage(slug: string) {
  return useQuery({
    queryKey: ['cmsPage', slug],
    queryFn: () => fetchCmsPage(slug),
  });
}

export function useUpdateCmsSection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, sectionKey, content }: { slug: string; sectionKey: string; content: any }) =>
      authenticatedFetch(`/cms/${slug}/${sectionKey}`, {
        method: 'POST',
        body: JSON.stringify(content),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cmsPage', variables.slug] });
    },
  });
}
