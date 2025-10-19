"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md space-y-6"
      >
        <div className="flex flex-col items-center space-y-4">
          <AlertTriangle className="w-16 h-16 text-destructive" />
          <h1 className="text-2xl md:text-3xl font-semibold">
            Oops! Something went wrong
          </h1>
          <p className="text-muted-foreground">
            We encountered an unexpected error. Don’t worry — you can try again
            or go back home.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Try again
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex cursor-pointer items-center gap-2"
          >
            Go home
          </button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <pre className="bg-muted text-sm rounded-lg p-4 overflow-x-auto mt-6 text-left">
            {error.message}
          </pre>
        )}
      </motion.div>
    </div>
  );
}
