"use client";

import { useEffect } from "react";
import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";

export default function NoPermission() {
  const router = useRouter();
  const hasPermission = useAuthStore1((s) => s.hasPermission);

  const routes = [
    { module: "asset-list", action: "view", path: "/assets" },
    { module: "issuers", action: "view", path: "/issuers" },
    { module: "spv-list", action: "view", path: "/spvs" },
    { module: "investors", action: "view", path: "/investors" },
  ];

  useEffect(() => {
    const allowedRoute = routes.find((route) =>
      hasPermission(route.module as any, route.action as any),
    );

    if (allowedRoute) {
      router.replace(allowedRoute.path);
    }
  }, [hasPermission, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 px-4">
      <div className="max-w-md w-full bg-white border rounded-xl shadow-sm p-8 text-center">
        <div className="flex justify-center mb-5">
          <div className="p-4 rounded-full bg-primary/10">
            <ShieldX className="h-10 w-10 text-primary" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-2">Permission Required</h1>

        <p className="text-sm text-muted-foreground mb-6">
          You don't have permission to access this page.
        </p>

        <Button className="w-full" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
