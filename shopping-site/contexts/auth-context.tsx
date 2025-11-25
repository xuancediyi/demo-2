"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  isLoginModalOpen: boolean;
  login: (user: User) => void;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  ensureAuthenticated: () => boolean;
}

const STORAGE_KEY = "demo-shopping-user";

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Failed to parse user from storage", error);
      return null;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (payload: User) => {
    setUser(payload);
    setIsLoginModalOpen(false);
  };

  const logout = () => setUser(null);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const ensureAuthenticated = () => {
    if (user) return true;
    openLoginModal();
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoginModalOpen,
        login,
        logout,
        openLoginModal,
        closeLoginModal,
        ensureAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

