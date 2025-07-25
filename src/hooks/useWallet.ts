import { useWalletStore } from "@/store/walletStore";

export function useWallet() {
  const {
    // State
    keyId,
    contractId,
    isLoading,
    error,

    // Actions
    connect,
    register,
    disconnect,
    setLoading,
    setError,
  } = useWalletStore();

  return {
    // State
    keyId,
    contractId,
    isLoading,
    error,

    // Actions
    connect,
    register,
    disconnect,
    setLoading,
    setError,
  };
}
