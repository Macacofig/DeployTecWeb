import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { getToken } from "../utils/token.util";

// URL base backend
const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081";

//Instancia axios custom
export const apiClient = axios.create({
  baseURL,
  // permite cookies/sesiones
  withCredentials: true,
});

// Se ejecuta antes de cada request
apiClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers = config.headers ?? {};
    // agregamos auth automática con prefijo Bearer
    config.headers.Authorization = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
  }

  return config;
});