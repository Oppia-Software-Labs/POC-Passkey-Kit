export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Login successful! Redirecting to dashboard...",
  REGISTER_SUCCESS: "Wallet created successfully! Redirecting to dashboard...",
  NO_WALLET_FOUND:
    "No existing wallet found. Please register a new wallet first.",
  LOGIN_FAILED: "Login failed",
  REGISTER_FAILED: "Registration failed",
} as const;

export const AUTH_STATES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

export type AuthState = (typeof AUTH_STATES)[keyof typeof AUTH_STATES];

export const getAuthErrorMessage = (error: string): string => {
  if (
    error.includes("No existing wallet found") ||
    error.includes("not found")
  ) {
    return AUTH_MESSAGES.NO_WALLET_FOUND;
  }
  return error;
};
