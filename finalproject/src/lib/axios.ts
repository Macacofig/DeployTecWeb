import axios from "axios";
import { getToken } from "../utils/token.util";

// URL base backend
const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081";

// Creamos instancia axios custom
export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

// Interceptor se ejecuta antes de cada request
apiClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers = config.headers ?? {};

    // Si ya tiene Bearer (puesto manualmente), no sobreescribir
    const existing = config.headers.Authorization as string | undefined;
    if (!existing || !existing.startsWith("Bearer ")) {
      config.headers.Authorization = token;
    }
  }

  return config;
});