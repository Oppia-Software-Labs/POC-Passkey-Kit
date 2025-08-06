"use client";

import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { WebAuthnStatus } from "./WebAuthnStatus";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const { isLoading, error, success, handleLogin, handleRegister } = useAuth();

  const isLogin = mode === "login";
  const title = isLogin ? "Login with Passkey" : "Create New Wallet";
  const description = isLogin
    ? "Use your passkey to securely access your wallet"
    : "Create a new wallet using passkey authentication";
  const buttonText = isLogin
    ? isLoading
      ? "Authenticating..."
      : "Login with Passkey"
    : isLoading
    ? "Creating Wallet..."
    : "Create New Wallet";
  const handleAction = isLogin ? handleLogin : handleRegister;
  const successMessage = isLogin
    ? "Login successful! Redirecting to dashboard..."
    : "Wallet created successfully! Redirecting to dashboard...";
  const linkText = isLogin
    ? "Don't have a wallet yet?"
    : "Already have a wallet?";
  const linkHref = isLogin ? "/register" : "/login";
  const linkLabel = isLogin ? "Register here" : "Login here";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          {title}
        </h2>

        {/* WebAuthn Status Check */}
        <WebAuthnStatus />

        <div className="space-y-4">
          <p className="text-gray-600 text-center">{description}</p>

          <Button
            onClick={handleAction}
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {buttonText}
          </Button>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-800">{successMessage}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {linkText}{" "}
            <a
              href={linkHref}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {linkLabel}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
