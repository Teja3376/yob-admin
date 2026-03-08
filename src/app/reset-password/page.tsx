import ResetPasswordPage from "@/modules/adminauth/ui/pages/ResetPasswordPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPassword() {
  return <ResetPasswordPage />;
}
