// Clave donde se guarda el token en localStorage
const TOKEN_KEY = "shopwavefusion_token";
const USER_KEY = "shopwavefusion_user";

function normalizeToken(token: string | null) {
  if (!token) {
    return null;
  }

  // Si empieza con "Bearer "
  // quitamos esa parte para obtener solo el token
  return token.startsWith("Bearer ") ? token.slice(7) : token;
}

// JWT usa Base64URL
// Esto lo convierte a Base64 normal
function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = (4 - (normalized.length % 4)) % 4;
  // atob() decodifica base64 a string
  return window.atob(normalized + "=".repeat(padding));
}

// Lee fecha expiración del JWT
function readTokenExp(token: string) {
  const normalizedToken = normalizeToken(token);

  if (!normalizedToken) {
    return null;
  }

  // JWT tiene:
  // header.payload.signature
  const parts = normalizedToken.split(".");

  if (parts.length !== 3) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(parts[1]));

    // exp = expiration timestamp
    if (typeof payload.exp !== "number") {
      return null;
    }

    return payload.exp * 1000;
  } catch {
    return null;
  }
}

// Guarda token en localStorage
export function saveToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TOKEN_KEY, token);
}

// Obtiene token guardado
export function getToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(TOKEN_KEY);
}

// Elimina token del navegador
export function removeToken() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(TOKEN_KEY);
}

// Verifica si JWT expiró
export function isTokenExpired(token = getToken()) {
  
  // si no hay token ya está expirado
  if (!token) {
    return true;
  }

  const expiresAt = readTokenExp(token);

  if (!expiresAt) {
    return false;
  }

  // compara fecha actual
  return Date.now() >= expiresAt;
}

// Verifica si existe token válido
export function hasToken() {
  const token = getToken();

  return Boolean(token && !isTokenExpired(token));
}

//Alias
export function setToken(token: string) {
  saveToken(token);
}

export function clearToken() {
  removeToken();
}

// Obtiene usuario guardado
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

// Guarda usuario en localStorage
export function setStoredUser<T>(user: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Elimina usuario guardado
export function clearStoredUser() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(USER_KEY);
}