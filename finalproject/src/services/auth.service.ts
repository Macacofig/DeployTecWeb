import type { AuthCredentials, AuthSession, User } from "../models/user.model";
import { apiClient } from "../lib/axios";
import { clearStoredUser, removeToken, saveToken, setStoredUser } from "../utils/token.util";

export async function signIn(credentials: AuthCredentials): Promise<AuthSession> {
  const response = await apiClient.get<User>("/auth/signin", {
    auth: {
      username: credentials.email,
      password: credentials.password,
    },
  });

  // Extraer el header de forma robusta (axios normaliza a minúsculas,
  // pero verificamos varias formas y descartamos un posible Basic)
  // eslint-disable-next-line no-console
  console.log("/auth/signin response headers:", response.headers);

  const rawHeader = response.headers["authorization"] ?? response.headers["Authorization"] ?? null;

  if (!rawHeader) {
    throw new Error("No se pudo validar la contraseña. Revisa tus credenciales e inténtalo otra vez.");
  }

  // Si por alguna razón el header contiene Basic (por request echo), ignorarlo.
  const token = typeof rawHeader === "string" && rawHeader.startsWith("Basic ") ? null : rawHeader;

  if (!token) {
    // No tenemos JWT válido en headers
    throw new Error("La respuesta no incluye un token JWT válido.");
  }

  saveToken(token);
  setStoredUser(response.data);

  return {
    user: response.data,
    token,
  };
}

export async function registerUser(user: User): Promise<AuthSession> {
  const response = await apiClient.post<User>("/auth/signup", user);
  // eslint-disable-next-line no-console
  console.log("/auth/signup response headers:", response.headers);

  const rawHeader = response.headers["authorization"] ?? response.headers["Authorization"] ?? null;

  if (!rawHeader) {
    throw new Error("No se pudo crear la sesión. Intenta registrarte otra vez.");
  }

  const token = typeof rawHeader === "string" && rawHeader.startsWith("Basic ") ? null : rawHeader;

  if (!token) {
    throw new Error("La respuesta no incluye un token JWT válido.");
  }

  saveToken(token);
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
  removeToken();
  clearStoredUser();
}