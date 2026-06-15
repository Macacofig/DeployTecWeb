export { apiClient } from "../lib/axios";

// acepta un path y lo normaliza para que siempre comience con "/"
// si tiene / lo deja si no lo agrega
export function buildApiPath(path: string) {
    return path.startsWith("/") ? path : `/${path}`;
}