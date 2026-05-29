"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
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
  //user logueado
  const [user, setUser] = useState<User | null>(null);
  //jwt actual
  const [token, setTokenState] = useState<string | null>(null);
  //si auth sigue verificando
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

  const refreshUser = useCallback(async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setStoredUser(currentUser);
    setTokenState(getToken());
  }, []);

  const signIn = useCallback(async (credentials: AuthCredentials) => {
    const session = await signInRequest(credentials);
    setUser(session.user);
    setTokenState(session.token);
    setStoredUser(session.user);
    return session;
  }, []);

  const register = useCallback(async (userPayload: User) => {
    const session = await registerUser(userPayload);
    if (session.token) {
      setUser(session.user);
      setTokenState(session.token);
      setStoredUser(session.user);
    }
    return session;
  }, []);

  const signOut = useCallback(() => {
    signOutRequest();
    removeToken();
    clearStoredUser();
    setUser(null);
    setTokenState(null);
    setLoading(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user && token && !isTokenExpired(token)),
      signIn,
      register,
      signOut,
      refreshUser,
    }),
    [loading, register, refreshUser, signIn, signOut, token, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }

  return context;
}