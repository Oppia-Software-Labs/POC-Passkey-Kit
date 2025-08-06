import { useEffect, useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { Client, networks } from "click_auth";

export function useClickAuth() {
  const { contractId, keyId } = useWallet();
  const [client, setClient] = useState<Client | null>(null);
  const [clickCount, setClickCount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Instanciar el cliente del contrato
  useEffect(() => {
    if (!client && contractId) {
      console.log("🔧 [CLICK-AUTH] Initializing client...");
      setClient(
        new Client({
          contractId: networks.testnet.contractId,
          networkPassphrase: networks.testnet.networkPassphrase,
          rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!,
        })
      );
    }
  }, [client, contractId]);

  // Obtener el valor actual al cargar
  useEffect(() => {
    if (client && contractId) {
      fetchClickCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, contractId]);

  const fetchClickCount = async () => {
    console.log("📊 [CLICK-AUTH] Fetching click count...");
    setLoading(true);
    setError(null);
    try {
      const result = await client!.get();
      const count = result.result?.toString() ?? "0";
      console.log("✅ [CLICK-AUTH] Click count fetched:", count);
      setClickCount(count);
    } catch (err) {
      console.error("❌ [CLICK-AUTH] Error fetching click count:", err);
      setError("Error fetching click count");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    console.log("🖱️ [CLICK-AUTH] Executing click...");
    setLoading(true);
    setError(null);
    try {
      if (!keyId) {
        throw new Error("No keyId available for signing");
      }

      if (!client) {
        throw new Error("Client not initialized");
      }

      if (!contractId) {
        throw new Error("No contract ID available");
      }

      // 1. Armar la transacción
      console.log("📝 [CLICK-AUTH] Building transaction...");
      const tx = await client.click({ user: contractId });

      // 2. Firmar la transacción con PasskeyKit
      console.log("✍️ [CLICK-AUTH] Signing transaction...");
      const { account, server } = await import("@/lib/passkey");
      const signedTx = await account.sign(tx.toXDR(), { keyId });

      // 3. Enviar la transacción firmada
      console.log("📤 [CLICK-AUTH] Sending transaction...");
      await server.send(signedTx);

      console.log("✅ [CLICK-AUTH] Click executed successfully!");

      // 4. Actualizar el contador
      await fetchClickCount();
    } catch (err) {
      console.error("❌ [CLICK-AUTH] Error executing click:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Error executing click";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    clickCount,
    loading,
    error,
    handleClick,
  };
}
