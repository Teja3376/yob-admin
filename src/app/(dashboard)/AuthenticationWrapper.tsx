"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";

const AuthenticationWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, hasHydrated } = useAuthStore1();

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated) return null;
  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default AuthenticationWrapper;
