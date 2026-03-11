"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";
import { LogOut } from "lucide-react";
import clsx from "clsx";


const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, clearAuth ,hasPermission } = useAuthStore1();
  const isIssuersAllowed = hasPermission("issuers", "view");
  const isSpvsAllowed = hasPermission("spvs", "view");
  const isAssetsAllowed = hasPermission("assets", "view");
  const isOrdersAllowed = hasPermission("orders", "view");
  const isInvestorsAllowed = hasPermission("investors", "view");
  const isRolesAllowed = hasPermission("roles", "view") || hasPermission("members", "view");
  const navLinks = [
    { label: "Issuers", href: "/issuers", allowed: isIssuersAllowed },
    { label: "Spv's", href: "/spv-list", allowed: isSpvsAllowed },
    { label: "Assets", href: "/asset-list", allowed: isAssetsAllowed },
    { label: "Orders", href: "/orders", allowed: isOrdersAllowed },
    { label: "Investors", href: "/investors", allowed: isInvestorsAllowed },
    { label: "Roles", href: "/roles", allowed: isRolesAllowed },
  ];
  

  const handleLogout = () => {
    if (isAuthenticated) {
      clearAuth();
      router.push("/login");
    }
  };
  return (
    <div className="w-52 h-full border-r flex flex-col  bg-white pt-10">
      <nav className="px-4 space-y-3 flex-1">
        {navLinks.map((item) => {
          const isActive = pathname === item.href;
          const baseClass = `block rounded-md px-4 py-2 text-sm transition ${
            isActive
              ? "text-white font-medium bg-primary"
              : "text-black hover:bg-zinc-100"
          }`;

          if (!item.allowed) {
            return (
              <span
                key={item.href}
                className={clsx(`${baseClass} hidden cursor-not-allowed opacity-50 pointer-events-none`)}
                aria-disabled
              >
                {item.label}
              </span>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={baseClass}>
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
