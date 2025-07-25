"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { Client, networks } from "click_auth";
import { Button } from "@/components/ui/button";

export default function ClickAuthPage() {
  const { contractId, keyId } = useWallet();
  const [client, setClient] = useState<Client | null>(null);
  const [clickCount, setClickCount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Instanciar el cliente del contrato
  useEffect(() => {
    if (!client && contractId) {
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
    setLoading(true);
    setError(null);
    try {
      const result = await client!.get();
      setClickCount(result.result?.toString() ?? "0");
    } catch {
      setError("Error fetching click count");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!keyId) {
        setError("No keyId available for signing");
        setLoading(false);
        return;
      }
      // 1. Armar la transacción
      const tx = await client!.click({ user: contractId! });
      // 2. Firmar la transacción con PasskeyKit
      const { account, server } = await import("@/lib/passkey");
      const signedTx = await account.sign(tx.toXDR(), { keyId });
      // Si quieres debug, puedes dejar el log:
      // console.log(signedTx);
      // 3. Enviar la transacción firmada
      await server.send(signedTx);
      await fetchClickCount();
    } catch {
      setError("Error executing click");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Click Auth Contract
        </h2>
        <div className="mb-4 text-center">
          <div className="text-gray-700 text-lg">Current Clicks:</div>
          <div className="text-3xl font-mono font-bold">
            {loading ? "..." : clickCount}
          </div>
        </div>
        <Button
          onClick={handleClick}
          disabled={loading || !client}
          className="w-full mb-2"
        >
          {loading ? "Processing..." : "Click!"}
        </Button>
        {error && (
          <div className="text-red-600 text-sm text-center mt-2">{error}</div>
        )}
      </div>
    </div>
  );
}
