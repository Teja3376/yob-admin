"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { title } from "process";

const tabs = [
  {
    title: "Roles",
    href: "/roles",
  },
  {
    title: "Members",
    href: "/members",
  },
];
const RoleTabs = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold text-gray-900">Role Management</h1>
      <div>
        <nav className="inline-flex space-x-4 mt-4 border-b">
          {" "}
          {tabs.map((tab) => {
            const isActive = pathname.includes(tab.href);
            return (
              <a
                key={tab.href}
                href={tab.href}
                className={clsx(
                  isActive
                    ? " text-primary border-primary border-b-2"
                    : "text-gray-700",
                  "px-3 py-2  text-sm font-medium cursor-pointer",
                )}
              >
                {tab.title}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default RoleTabs;
