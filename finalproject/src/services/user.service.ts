import type { User } from "../models/user.model";
import { apiClient } from "../lib/axios";

export async function getUserProfile(): Promise<User> {
  const response = await apiClient.get<User>("/users/profile");
  return response.data;
}

export async function updateUserProfile(profile: Partial<User>): Promise<User> {
  const response = await apiClient.put<User>("/users/profile", profile);
  return response.data;
}