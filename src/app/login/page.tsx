"use client";

import { useLogin } from "@/hooks/useLogin";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { isLoading, error, success, handleLogin } = useLogin();

  return (
    <div className="flex items-center justify-center py-12">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Login with Passkey
          </h2>
        </div>

        <div className="space-y-4">
          <Button onClick={handleLogin} disabled={isLoading} className="w-full">
            {isLoading ? "Connecting..." : "Connect"}
          </Button>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          {success && (
            <div className="text-green-600 text-sm text-center">
              Wallet connected successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
