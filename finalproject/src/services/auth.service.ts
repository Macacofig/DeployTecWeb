import type { AuthCredentials, AuthSession, User } from "../models/user.model";
import { apiClient } from "../lib/axios";
import { clearStoredUser, clearToken, setStoredUser, setToken } from "../utils/token.util";

export async function signIn(credentials: AuthCredentials): Promise<AuthSession> {
  const response = await apiClient.get<User>("/auth/signin", {
    auth: {
      username: credentials.email,
      password: credentials.password,
    },
  });

  const token = response.headers["authorization"] ?? null;

  if (token) {
    setToken(token);
  }

  setStoredUser(response.data);

  return {
    user: response.data,
    token,
  };
}

export async function registerUser(user: User): Promise<AuthSession> {
  const response = await apiClient.post<User>("/auth/signup", user);
  const token = response.headers["authorization"] ?? null;

  if (token) {
    setToken(token);
  }

  setStoredUser(response.data);

  return {
    user: response.data,
    token,
  };
}

export async function getCurrentUser() {
  const response = await apiClient.get<User>("/auth/signin");
  return response.data;
}

export function signOut() {
  clearToken();
  clearStoredUser();
}