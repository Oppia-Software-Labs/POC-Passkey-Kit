import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import base64url from "base64url";

export interface WalletState {
  keyId: string | null;
  contractId: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface WalletActions {
  setKeyId: (keyId: string) => void;
  setContractId: (contractId: string) => void;
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
      isLoading: false,
      error: null,

      setKeyId: (keyId: string) => set({ keyId }),
      setContractId: (contractId: string) => set({ contractId }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: string | null) => set({ error }),

      connect: async (keyId?: string) => {
        set({ isLoading: true, error: null });
        try {
          const { account, server } = await import("../lib/passkey");
          const { keyId: kid, contractId: cid } = await account.connectWallet({
            keyId,
            getContractId: (keyId) => server.getContractId({ keyId }),
          });
          const encodedKeyId = base64url(kid);
          set({
            keyId: encodedKeyId,
            contractId: cid,
            isLoading: false,
            error: null,
          });
        } catch (err: unknown) {
          const errorMsg =
            err instanceof Error ? err.message : "Connection failed";
          set({ isLoading: false, error: errorMsg });
          throw err;
        }
      },

      register: async (name: string) => {
        set({ isLoading: true, error: null });
        try {
          const { account, server } = await import("../lib/passkey");
          const res = await account.createWallet("App", name);
          const { keyId: kid, contractId: cid, signedTx } = res;
          await server.send(signedTx);
          const encodedKeyId = base64url(kid);
          set({
            keyId: encodedKeyId,
            contractId: cid,
            isLoading: false,
            error: null,
          });
        } catch (err: unknown) {
          const errorMsg =
            err instanceof Error ? err.message : "Registration failed";
          set({ isLoading: false, error: errorMsg });
          throw err;
        }
      },

      disconnect: () => {
        set({ keyId: null, contractId: null, error: null });
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
