import { useWallet } from "./useWallet";

export function useNavbar() {
  const { keyId, contractId, disconnect } = useWallet();

  const handleDisconnect = () => {
    console.log("🔧 [NAVBAR] Disconnecting wallet...");
    disconnect();
    console.log("🔧 [NAVBAR] Wallet disconnected");
  };

  return {
    keyId,
    contractId,
    handleDisconnect,
  };
}
