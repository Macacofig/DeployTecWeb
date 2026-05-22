export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isStrongPassword(password: string) {
  return password.trim().length >= 8;
}

export function isFilled(value: string) {
  return value.trim().length > 0;
}