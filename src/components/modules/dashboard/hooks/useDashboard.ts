import { useWallet } from "@/hooks/useWallet";

export function useDashboard() {
  const { keyId, contractId, balance, disconnect } = useWallet();

  const handleDisconnect = () => {
    console.log("🔧 [DASHBOARD] Disconnecting wallet...");
    disconnect();
    console.log("🔧 [DASHBOARD] Wallet disconnected");
  };

  return {
    keyId,
    contractId,
    balance,
    handleDisconnect,
  };
}
