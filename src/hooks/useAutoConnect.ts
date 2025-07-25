"use client";
import { useEffect } from "react";
import { useWallet } from "./useWallet";

export function useAutoConnect() {
  const { keyId, contractId, connect } = useWallet();

  useEffect(() => {
    // Si ya hay keyId y contractId en el estado, no hacer nada
    if (keyId && contractId) return;

    // Si hay datos en localStorage, intenta conectar automáticamente usando el keyId guardado
    const stored = localStorage.getItem("wallet-storage");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.keyId) {
          connect(parsed.keyId).catch(() => {});
        }
      } catch {
        // Si falla el parseo, no hacer nada
      }
    }
  }, [keyId, contractId, connect]);
}
