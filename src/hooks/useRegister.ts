import { useState, useEffect } from "react";
import { useWallet } from "./useWallet";
import { useRouter } from "next/navigation";

export function useRegister() {
  const {
    register,
    keyId,
    isLoading: storeLoading,
    error: storeError,
  } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Redirigir si ya está conectado
  useEffect(() => {
    if (keyId) {
      console.log(
        "🔐 [REGISTER] Already connected, redirecting to dashboard..."
      );
      router.push("/dashboard");
    }
  }, [keyId, router]);

  const handleRegister = async () => {
    console.log("🚀 [REGISTER] Starting registration process...");
    setIsLoading(true);
    setError(null);

    try {
      console.log("📝 [REGISTER] Calling register with name: My Wallet");
      await register("My Wallet");
      console.log("✅ [REGISTER] Registration completed successfully!");
      setSuccess(true);

      // Redirigir después de registro exitoso
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("❌ [REGISTER] Registration error:", err);
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      console.log("🏁 [REGISTER] Registration process finished");
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    success,
    handleRegister,
  };
}
