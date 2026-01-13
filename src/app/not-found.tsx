"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <SearchX size={64} className="text-muted-foreground" />
        </div>

        {/* Code */}
        <h1 className="text-7xl font-bold text-primary">404</h1>

        {/* Short title */}
        <h2 className="text-2xl font-semibold">Looks like you’re lost</h2>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>

          <Button
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <Home size={16} />
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
