import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { User } from "../types/user";
import { mockUsers } from "../data/mockUsers";
import { getItem, setItem, removeItem } from "../services/storageService";

const SESSION_KEY = "userSession";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, _password: string) => Promise<void>;
  register: (name: string, email: string, _password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getItem(SESSION_KEY).then((storedUser) => {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    });
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    const found = mockUsers.find((u) => u.email === email);
    if (!found) {
      const firstUser = mockUsers[0];
      return register(firstUser.name, firstUser.email, _password);
    }
    setUser(found);
    await setItem(SESSION_KEY, JSON.stringify(found));
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string) => {
    const found = mockUsers.find((u) => u.email === email);
    if (found) {
      setUser(found);
      await setItem(SESSION_KEY, JSON.stringify(found));
      return;
    }
    const firstUser = mockUsers[0];
    setUser(firstUser);
    await setItem(SESSION_KEY, JSON.stringify(firstUser));
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
        login,
        register,
        logout,
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
