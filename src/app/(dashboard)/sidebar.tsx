"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export const navLinks = [
  { label: "Issuers", href: "/issuers" },
  { label: "Spv's", href: "/spv-list" },
  { label: "Assets", href: "/asset-list" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, clearAuth } = useAuthStore1();
  const handleLogout = () => {
    if (isAuthenticated) {
      clearAuth();
      router.push("/login");
    }
  };
  return (
    <div className="w-52 h-full border-r flex flex-col  bg-white pt-10">
      <nav className="px-4 space-y-1 flex-1">
        {navLinks.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-4 py-2 text-sm transition ${
                isActive
                  ? "text-primary font-medium bg-gray-100"
                  : "text-black hover:bg-zinc-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 p-2 border-t bg-foreground/40">
        <div
          onClick={handleLogout}
          className="w-full flex items-center gap-2 rounded-md px-4 py-2 text-sm text-black hover:bg-foreground transition bg-transparent cursor-pointer"
        >
          <LogOut size={16} />
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
