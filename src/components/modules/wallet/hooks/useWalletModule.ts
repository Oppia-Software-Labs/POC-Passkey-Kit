import { useWallet } from "@/hooks/useWallet";

export function useWalletModule() {
  const { keyId, contractId, balance, disconnect } = useWallet();

  const handleDisconnect = () => {
    console.log("🔧 [WALLET] Disconnecting wallet...");
    disconnect();
    console.log("🔧 [WALLET] Wallet disconnected");
  };

  return {
    keyId,
    contractId,
    balance,
    handleDisconnect,
  };
}
