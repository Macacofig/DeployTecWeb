import type { User } from "../models/user.model";
import { apiClient } from "../lib/axios";

// get usando apiClient, que ya tiene el token automático
export async function getUserProfile(): Promise<User> {
  const response = await apiClient.get<User>("/auth/signin");
  return response.data;
}

// actualizar perfil usando apiClient, que ya tiene el token automático
export async function updateUserProfile(profile: Partial<User>): Promise<User> {
  const response = await apiClient.put<User>("/users/profile", profile);
  return response.data;
}