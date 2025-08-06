export const DASHBOARD_MESSAGES = {
  CONNECTED: "✅ Yes",
  NOT_CONNECTED: "❌ No",
  NO_WALLET_CONNECTED:
    "No wallet connected. Get started by creating or connecting a wallet:",
  TIP_MESSAGE:
    "💡 Tip: If you've registered before, try logging in. If not, register a new wallet.",
} as const;

export const formatBalance = (balance: string | null): string => {
  if (!balance) return "0";
  return (Number(balance) / 10_000_000).toString();
};

export const getConnectionStatus = (
  contractId: string | null
): {
  isConnected: boolean;
  statusText: string;
  statusColor: string;
} => {
  const isConnected = !!contractId;
  return {
    isConnected,
    statusText: isConnected
      ? DASHBOARD_MESSAGES.CONNECTED
      : DASHBOARD_MESSAGES.NOT_CONNECTED,
    statusColor: isConnected ? "text-green-600" : "text-red-600",
  };
};
