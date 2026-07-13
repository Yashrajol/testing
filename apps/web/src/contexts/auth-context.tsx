import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getAuthToken, setAuthSession, clearAuthSession } from "@/lib/api";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  [key: string]: any;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Rehydrate auth state from localStorage on mount
    const savedToken = getAuthToken();
    const savedUser = localStorage.getItem("vedhkrit_auth_user");
    
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        clearAuthSession();
      }
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    setAuthSession(newToken, newUser);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    clearAuthSession();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
