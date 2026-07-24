export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  organizationId?: string;
  [key: string]: any;
}

export const authStore = {
  getAccessToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('vedhkrit_access_token') : null;
  },
  getRefreshToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('vedhkrit_refresh_token') : null;
  },
  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('vedhkrit_user');
    try {
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },
  getRole(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('vedhkrit_role') : null;
  },
  getOrganization(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('vedhkrit_organization') : null;
  },
  setSession(accessToken: string, refreshToken: string, user: User) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vedhkrit_access_token', accessToken);
      localStorage.setItem('vedhkrit_refresh_token', refreshToken);
      localStorage.setItem('vedhkrit_user', JSON.stringify(user));
      localStorage.setItem('vedhkrit_role', user.role || '');
      localStorage.setItem('vedhkrit_organization', user.organizationId || user.orgId || '');
      
      // Legacy compatibility keys
      localStorage.setItem('vedhkrit_auth_token', accessToken);
      localStorage.setItem('vedhkrit_auth_user', JSON.stringify(user));
    }
  },
  clearSession() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vedhkrit_access_token');
      localStorage.removeItem('vedhkrit_refresh_token');
      localStorage.removeItem('vedhkrit_user');
      localStorage.removeItem('vedhkrit_role');
      localStorage.removeItem('vedhkrit_organization');
      
      // Legacy compatibility keys
      localStorage.removeItem('vedhkrit_auth_token');
      localStorage.removeItem('vedhkrit_auth_user');
    }
  }
};
