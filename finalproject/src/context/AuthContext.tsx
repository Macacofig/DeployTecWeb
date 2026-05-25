"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { AuthCredentials, AuthSession, User } from "../models/user.model";
import { getCurrentUser, registerUser, signIn as signInRequest, signOut as signOutRequest } from "../services/auth.service";
import { clearStoredUser, getStoredUser, getToken, isTokenExpired, removeToken, setStoredUser } from "../utils/token.util";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (credentials: AuthCredentials) => Promise<AuthSession>;
  register: (user: User) => Promise<AuthSession>;
  signOut: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const storedToken = getToken();
      const storedUser = getStoredUser<User>();

      if (storedToken && !isTokenExpired(storedToken) && storedUser) {
        setTokenState(storedToken);
        setUser(storedUser);
      } else {
        removeToken();
        clearStoredUser();
      }

      setLoading(false);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  async function refreshUser() {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setStoredUser(currentUser);
    setTokenState(getToken());
  }

  async function signIn(credentials: AuthCredentials) {
    const session = await signInRequest(credentials);
    setUser(session.user);
    setTokenState(session.token);
    setStoredUser(session.user);
    return session;
  }

  async function register(userPayload: User) {
    const session = await registerUser(userPayload);
    setUser(session.user);
    setTokenState(session.token);
    setStoredUser(session.user);
    return session;
  }

  function signOut() {
    signOutRequest();
    removeToken();
    clearStoredUser();
    setUser(null);
    setTokenState(null);
    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(user && token && !isTokenExpired(token)),
        signIn,
        register,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }

  return context;
}