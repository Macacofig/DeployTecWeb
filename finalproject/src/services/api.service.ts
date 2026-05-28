export { apiClient } from "../lib/axios";

export function buildApiPath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}