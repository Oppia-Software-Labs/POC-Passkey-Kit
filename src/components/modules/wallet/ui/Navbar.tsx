"use client";

import { useWalletModule } from "../hooks/useWalletModule";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  const { keyId, handleDisconnect } = useWalletModule();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Passkey Stellar POC
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <a
              href="/dashboard"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </a>
            <a
              href="/click-auth"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Click Auth
            </a>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-3">
            {keyId ? (
              // Wallet connected - show disconnect
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-600">
                  <span className="text-green-600">●</span> Connected
                </div>
                <Button onClick={handleDisconnect} variant="outline" size="sm">
                  Disconnect
                </Button>
              </div>
            ) : (
              // Not connected - show register/login
              <div className="flex items-center space-x-2">
                <a href="/register">
                  <Button variant="outline" size="sm">
                    Register
                  </Button>
                </a>
                <a href="/login">
                  <Button size="sm">Login</Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
