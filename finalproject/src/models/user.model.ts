export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  password?: string;
  role?: string;
  createdAt?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthSession {
  user: User;
  token: string | null;
}