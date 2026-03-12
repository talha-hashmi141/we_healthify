import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authAPI } from "../api/auth.api";
import { env } from "../config/env";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    if (!localStorage.getItem(env.TOKEN_KEY)) return setLoading(false);
    try {
      const res = await authAPI.getMe();
      setUser(res.data.user);
    } catch {
      localStorage.removeItem(env.TOKEN_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadUser(); }, [loadUser]);

  const login = async (credentials) => {
    const res = await authAPI.login(credentials);
    localStorage.setItem(env.TOKEN_KEY, res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem(env.TOKEN_KEY);
    setUser(null);
  };

  const value = { user, loading, login, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
