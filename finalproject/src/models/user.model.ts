// representa un usuario del sistema
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

// datos para autenticación
export interface AuthCredentials {
  email: string;
  password: string;
}

// respuesta del backend al iniciar sesión o registrarse
export interface AuthSession {
  user: User;
  token: string | null;
}