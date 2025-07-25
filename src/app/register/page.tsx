"use client";

import { useRegister } from "@/hooks/useRegister";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const { isLoading, error, success, handleRegister } = useRegister();

  return (
    <div className="flex items-center justify-center py-12">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Register with Passkey
          </h2>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Creating wallet..." : "Register Wallet"}
          </Button>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          {success && (
            <div className="text-green-600 text-sm text-center">
              Wallet created successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
