import { Metadata } from "next";
import RoleTabs from "./tabs";

type StatusTab = "pending" | "rejected" | "approved";
export const metadata: Metadata = {
  title: "Roles Management",
};
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
