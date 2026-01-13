"use client";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";
import { is } from "date-fns/locale";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated } = useAuthStore1();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      //redirect to dashboard
    }
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50  dark:bg-black">
      Hello
    </div>
  );
}
