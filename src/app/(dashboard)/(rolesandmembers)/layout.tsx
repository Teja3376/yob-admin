import { Metadata } from "next";
import RoleTabs from "./tabs";


export default function RolesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <RoleTabs />
      {children}
    </div>
  );
}
