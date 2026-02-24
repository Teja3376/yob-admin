"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { LogOut, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";
import { useRouter } from "next/navigation";

const ProfilePopover = () => {
  const { isAuthenticated, clearAuth } = useAuthStore1();
  const router = useRouter();

  const handleLogout = () => {
    if (isAuthenticated) {
      clearAuth();
      router.push("/login");
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <User />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={10} className="w-50 mr-2 px-4 py-2">
        <h1 className="font-semibold mb-2">My Account</h1>
        <hr className="my-1" />
        <div
          className="border-0 shadow-none w-full text-left text-sm cursor-pointer  hover:bg-gray-100 flex items-center gap-2 py-2 px-2"
          onClick={handleLogout}
        >
          <LogOut size={15} />
          Logout
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Header = () => {
  return (
    <div className="h-15 w-full flex justify-between items-center px-5 border-b bg-white">
      <div className="relative w-30 h-20">
        <Image
          className="object-contain"
          src="/assets/logo/Web-06.png"
          alt="Nexa-Logo"
          fill
        />
      </div>
      <div className="flex gap-2 items-center">
        <div className=" bg-white shadow-xs">
          <div className="px-4 py-4 space-y-3">
            <div className="text-xs font-semibold text-gray-500 uppercase">
              Super Admin Panel
            </div>
          </div>
        </div>
        <ProfilePopover />
      </div>
    </div>
  );
};

export default Header;
