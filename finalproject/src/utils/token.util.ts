const TOKEN_KEY = "shopwavefusion_token";
const USER_KEY = "shopwavefusion_user";

function normalizeToken(token: string | null) {
  if (!token) {
    return null;
  }

  return token.startsWith("Bearer ") ? token.slice(7) : token;
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = (4 - (normalized.length % 4)) % 4;

  return window.atob(normalized + "=".repeat(padding));
}

function readTokenExp(token: string) {
  const normalizedToken = normalizeToken(token);

  if (!normalizedToken) {
    return null;
  }

  const parts = normalizedToken.split(".");

  if (parts.length !== 3) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(parts[1]));

    if (typeof payload.exp !== "number") {
      return null;
    }

    return payload.exp * 1000;
  } catch {
    return null;
  }
}

export function saveToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(TOKEN_KEY);
}

export function isTokenExpired(token = getToken()) {
  if (!token) {
    return true;
  }

  const expiresAt = readTokenExp(token);

  if (!expiresAt) {
    return false;
  }

  return Date.now() >= expiresAt;
}

export function hasToken() {
  const token = getToken();

  return Boolean(token && !isTokenExpired(token));
}

export function setToken(token: string) {
  saveToken(token);
}

export function clearToken() {
  removeToken();
}

export function getStoredUser<T>() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawUser = window.localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  return JSON.parse(rawUser) as T;
}

export function setStoredUser<T>(user: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(USER_KEY);
}