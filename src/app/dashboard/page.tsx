"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { keyId, contractId, balance, handleDisconnect } = useDashboard();

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Wallet Status</h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Connected:</span>
              <span className={contractId ? "text-green-600" : "text-red-600"}>
                {contractId ? "✅ Yes" : "❌ No"}
              </span>
            </div>

            {contractId && (
              <div>
                <span className="font-medium">Contract ID:</span>
                <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-sm">
                  {contractId}
                </code>
              </div>
            )}

            {keyId && (
              <div>
                <span className="font-medium">Key ID:</span>
                <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-sm">
                  {keyId}
                </code>
              </div>
            )}

            {balance && (
              <div>
                <span className="font-medium">Balance:</span>
                <span className="ml-2">{Number(balance) / 10_000_000} XLM</span>
              </div>
            )}
          </div>

          {contractId && (
            <div className="mt-6">
              <Button onClick={handleDisconnect} variant="destructive">
                Disconnect Wallet
              </Button>
            </div>
          )}

          {!contractId && (
            <div className="mt-6 space-y-2">
              <p className="text-gray-600">
                No wallet connected. Get started by creating or connecting a
                wallet:
              </p>
              <div className="space-x-4">
                <a
                  href="/register"
                  className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Register New Wallet
                </a>
                <a
                  href="/login"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Login with Passkey
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                💡 Tip: If you've registered before, try logging in. If not,
                register a new wallet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
