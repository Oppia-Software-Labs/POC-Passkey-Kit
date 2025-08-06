import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import base64url from "base64url";

export interface WalletState {
  keyId: string | null;
  contractId: string | null;
  balance: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface WalletActions {
  setKeyId: (keyId: string) => void;
  setContractId: (contractId: string) => void;
  setBalance: (balance: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  connect: (keyId?: string) => Promise<void>;
  register: (name: string) => Promise<void>;
  disconnect: () => void;
}

export type WalletStore = WalletState & WalletActions;

export const useWalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      keyId: null,
      contractId: null,
      balance: null,
      isLoading: false,
      error: null,

      setKeyId: (keyId: string) => set({ keyId }),
      setContractId: (contractId: string) => set({ contractId }),
      setBalance: (balance: string) => set({ balance }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: string | null) => set({ error }),

      connect: async (keyId?: string) => {
        set({ isLoading: true, error: null });
        try {
          console.log("🔗 [WALLET] Attempting to connect...");

          // Verificar si WebAuthn está disponible
          if (typeof window !== "undefined" && !window.PublicKeyCredential) {
            throw new Error(
              "WebAuthn is not supported in this browser. Please use a modern browser with WebAuthn support."
            );
          }

          const { account, server } = await import("../lib/passkey");
          console.log("📦 [WALLET] Passkey modules loaded successfully");

          const { keyId: kid, contractId: cid } = await account.connectWallet({
            keyId,
            getContractId: (keyId) => server.getContractId({ keyId }),
          });

          console.log("✅ [WALLET] Wallet connected successfully");
          const encodedKeyId = base64url(kid);

          // For now, set a default balance
          const balance = "10000000"; // 1 XLM in stroops

          set({
            keyId: encodedKeyId,
            contractId: cid,
            balance,
            isLoading: false,
            error: null,
          });
        } catch (err: unknown) {
          console.error("❌ [WALLET] Connection error:", err);
          let errorMsg = "Connection failed";

          if (err instanceof Error) {
            if (err.message.includes("WebAuthn is not supported")) {
              errorMsg =
                "WebAuthn is not supported in this browser. Please use a modern browser with WebAuthn support.";
            } else if (err.message.includes("No existing wallet found")) {
              errorMsg =
                "No existing wallet found. Please register a new wallet first.";
            } else {
              errorMsg = err.message;
            }
          }

          set({ isLoading: false, error: errorMsg });
          throw err;
        }
      },

      register: async (name: string) => {
        set({ isLoading: true, error: null });
        try {
          console.log("🚀 [WALLET] Attempting to register...");

          const { account, server } = await import("../lib/passkey");
          console.log("📦 [WALLET] Passkey modules loaded successfully");

          const res = await account.createWallet("App", name);
          console.log("✅ [WALLET] Wallet created successfully");

          const { keyId: kid, contractId: cid, signedTx } = res;
          await server.send(signedTx);
          const encodedKeyId = base64url(kid);

          // For now, set a default balance
          const balance = "10000000"; // 1 XLM in stroops

          set({
            keyId: encodedKeyId,
            contractId: cid,
            balance,
            isLoading: false,
            error: null,
          });
        } catch (err: unknown) {
          console.error("❌ [WALLET] Registration error:", err);
          let errorMsg = "Registration failed";

          if (err instanceof Error) {
            if (err.message.includes("WebAuthn is not supported")) {
              errorMsg =
                "WebAuthn is not supported in this browser. Please use a modern browser with WebAuthn support.";
            } else {
              errorMsg = err.message;
            }
          }

          set({ isLoading: false, error: errorMsg });
          throw err;
        }
      },

      disconnect: () => {
        console.log("🔌 [WALLET] Disconnecting wallet...");
        set({ keyId: null, contractId: null, balance: null, error: null });
      },
    }),
    {
      name: "wallet-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        keyId: state.keyId,
        contractId: state.contractId,
      }),
    }
  )
);
