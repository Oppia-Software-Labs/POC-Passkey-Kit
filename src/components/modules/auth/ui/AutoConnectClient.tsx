"use client";

import { useEffect } from "react";
import { useWallet } from "@/hooks/useWallet";

export function AutoConnectClient() {
  const { connect, keyId } = useWallet();

  useEffect(() => {
    // Intentar conectar automáticamente si hay datos almacenados
    const storedKeyId = localStorage.getItem("wallet-storage");
    if (storedKeyId && !keyId) {
      console.log("🔄 [AUTO-CONNECT] Attempting to auto-connect...");
      connect().catch((error) => {
        console.log("❌ [AUTO-CONNECT] Auto-connect failed:", error);
      });
    }
  }, [connect, keyId]);

  return null; // Este componente no renderiza nada
}
