import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { User } from "../types/user";
import { mockUsers } from "../data/mockUsers";
import { getItem, setItem, removeItem } from "../services/storageService";

const SESSION_KEY = "userSession";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getItem(SESSION_KEY).then((storedUser) => {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const found = mockUsers.find((u) => u.email === email);
    if (!found) {
      setError("No account found with this email.");
      setIsLoading(false);
      return;
    }
    setUser(found);
    await setItem(SESSION_KEY, JSON.stringify(found));
    setIsLoading(false);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setError(null);
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const found = mockUsers.find((u) => u.email === email);
    if (found) {
      setUser(found);
      await setItem(SESSION_KEY, JSON.stringify(found));
    } else {
      const firstUser = mockUsers[0];
      setUser(firstUser);
      await setItem(SESSION_KEY, JSON.stringify(firstUser));
    }
    setIsLoading(false);
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    await removeItem(SESSION_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
