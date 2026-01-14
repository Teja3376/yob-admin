import Header from "@/components/common/header";
import Sidebar from "./sidebar";
import AuthenticationWrapper from "./AuthenticationWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - YOB Assets",
  description:
    "Admin dashboard for YOB Assets to monitor asset data, manage internal users, review approvals, and oversee daily operations securely.",

  keywords: [
    "YOB Assets",
    "YOB admin dashboard",
    "asset management dashboard",
    "internal asset administration",
    "admin panel",
    "asset approvals",
  ],

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Admin Dashboard - YOB Assets",
    description:
      "YOB Assets admin dashboard for managing assets, users, approvals, and internal operational workflows.",
    type: "website",
  },
};



export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthenticationWrapper>
      <div className="h-screen overflow-hidden flex flex-col w-full">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
        </div>

        {/* Body */}
        <div className="flex pt-16 h-full">
         
          <aside className="h-full shrink-0">
            <Sidebar />
          </aside>

          {/* Main content (ONLY this scrolls) */}
          <main className="flex-1 h-full overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthenticationWrapper>
  );
}
