"use client";

import { useEffect, useState } from "react";

export function WebAuthnStatus() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [details, setDetails] = useState<string>("");

  useEffect(() => {
    const checkWebAuthnSupport = () => {
      try {
        // Verificar si estamos en el navegador
        if (typeof window === "undefined") {
          setIsSupported(false);
          setDetails("Not in browser environment");
          return;
        }

        // Verificar si WebAuthn está disponible
        if (!window.PublicKeyCredential) {
          setIsSupported(false);
          setDetails("WebAuthn not supported in this browser");
          return;
        }

        // Verificar si es un contexto seguro (HTTPS o localhost)
        if (!window.isSecureContext) {
          setIsSupported(false);
          setDetails("WebAuthn requires a secure context (HTTPS or localhost)");
          return;
        }

        // Verificar si el navegador soporta las APIs necesarias
        if (!window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
          setIsSupported(false);
          setDetails("Platform authenticator not available");
          return;
        }

        // Verificar si el autenticador de plataforma está disponible
        window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
          .then((available) => {
            if (available) {
              setIsSupported(true);
              setDetails("WebAuthn is fully supported");
            } else {
              setIsSupported(false);
              setDetails("Platform authenticator not available");
            }
          })
          .catch((error) => {
            setIsSupported(false);
            setDetails(`Error checking platform authenticator: ${error.message}`);
          });
      } catch (error) {
        setIsSupported(false);
        setDetails(`Error checking WebAuthn support: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    checkWebAuthnSupport();
  }, []);

  if (isSupported === null) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">Checking WebAuthn support...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isSupported) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-800">✅ {details}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-800">❌ {details}</p>
          <p className="text-xs text-red-600 mt-1">
            Please use a modern browser with WebAuthn support and ensure you're on HTTPS or localhost.
          </p>
        </div>
      </div>
    </div>
  );
} 