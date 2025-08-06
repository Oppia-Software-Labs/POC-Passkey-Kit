export const CLICK_AUTH_MESSAGES = {
  FETCH_ERROR: "Error fetching click count",
  EXECUTE_ERROR: "Error executing click",
  NO_KEY_ID: "No keyId available for signing",
} as const;

export const CLICK_AUTH_STATES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

export type ClickAuthState =
  (typeof CLICK_AUTH_STATES)[keyof typeof CLICK_AUTH_STATES];

export const formatClickCount = (count: string | null): string => {
  return count ?? "0";
};

export const getClickAuthConfig = () => ({
  contractId: process.env.NEXT_PUBLIC_CONTRACT_ID,
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
});
