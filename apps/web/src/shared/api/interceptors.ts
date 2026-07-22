import { getAuthToken, setAuthSession, clearAuthSession } from './axios';

export const sessionManager = {
  getToken: getAuthToken,
  setSession: setAuthSession,
  clearSession: clearAuthSession,
};
