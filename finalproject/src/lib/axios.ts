import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { getToken } from "../utils/token.util";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081";

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken();

  if (token) {
    config.headers = config.headers ?? {};
    // Aseguramos el header Authorization (axios acepta mayúsculas/minúsculas)
    // No modificamos el valor del token aquí (preservar formato actual).
    (config.headers as Record<string, unknown>).Authorization = token;
  }

  return config;
});