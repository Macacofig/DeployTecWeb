import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { getToken } from "../utils/token.util";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081";

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

// Interceptor:
// se ejecuta ANTES de cada request
apiClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers = config.headers ?? {};
    // agregamos auth automática
    config.headers.Authorization = token;
  }

  return config;
});