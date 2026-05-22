export { apiClient } from "../lib/axios";

export function buildApiPath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}