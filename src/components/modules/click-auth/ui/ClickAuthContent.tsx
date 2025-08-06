"use client";

import { useClickAuth } from "../hooks/useClickAuth";
import { Button } from "@/components/ui/button";

export function ClickAuthContent() {
  const { clickCount, loading, error, handleClick } = useClickAuth();

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
          disabled={loading}
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
