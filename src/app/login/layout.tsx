import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal Login",
  description:
    "YOB Assets admin portal login for managing assets, internal users, approvals, and operational settings.",
};
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
