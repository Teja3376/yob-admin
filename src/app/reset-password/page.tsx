import ResetPasswordPage from "@/modules/adminauth/ui/pages/ResetPasswordPage";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPassword() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordPage />
    </Suspense>
  );
}
