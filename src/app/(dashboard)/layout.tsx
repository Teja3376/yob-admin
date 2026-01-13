import Header from "@/components/common/header";
import Sidebar from "./sidebar";
import AuthenticationWrapper from "./AuthenticationWrapper";

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
