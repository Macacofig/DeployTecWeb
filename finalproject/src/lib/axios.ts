import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { getToken } from "../utils/token.util";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081";

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();

  if (token) {
    config.headers.set("Authorization", token);
  }

  return config;
});