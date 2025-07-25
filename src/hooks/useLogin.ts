import { useState, useEffect } from "react";
import { useWallet } from "./useWallet";
import { useRouter } from "next/navigation";

export function useLogin() {
  const { connect, keyId, contractId } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Si hay datos en localStorage pero no hay sesión activa, intenta conectar automáticamente
  useEffect(() => {
    const storedKeyId = localStorage.getItem("wallet-storage");
    if (storedKeyId && !keyId) {
      // Intenta conectar automáticamente
      connect().catch(() => {});
    }
  }, [keyId, connect]);

  // Redirigir si ya está conectado
  useEffect(() => {
    if (keyId) {
      console.log("🔐 [LOGIN] Already connected, redirecting to dashboard...");
      router.push("/dashboard");
    }
  }, [keyId, router]);

  const handleLogin = async () => {
    console.log("🔐 [LOGIN] Starting login process...");
    setIsLoading(true);
    setError(null);

    try {
      console.log(
        "🔗 [LOGIN] Calling connect() without keyId to try existing wallet..."
      );
      await connect();
      console.log("✅ [LOGIN] Login completed successfully!");
      console.log("✅ [LOGIN] After login - keyId:", keyId);
      console.log("✅ [LOGIN] After login - contractId:", contractId);
      setSuccess(true);

      // Redirigir después de login exitoso
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: unknown) {
      console.error("❌ [LOGIN] Login error:", err);
      if (err instanceof Error) {
        console.error("❌ [LOGIN] Error details:", {
          message: err.message,
          stack: err.stack,
          name: err.name,
        });
      }
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);

      // Si no hay wallet existente, mostrar sugerencia
      if (
        errorMessage.includes("No existing wallet found") ||
        errorMessage.includes("not found")
      ) {
        setError(
          "No existing wallet found. Please register a new wallet first."
        );
      }
    } finally {
      console.log("🏁 [LOGIN] Login process finished");
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    success,
    handleLogin,
  };
}
