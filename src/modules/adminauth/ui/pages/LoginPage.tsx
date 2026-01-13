"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore1 } from "../../state/adminAuthStore";
import { LoginFormValues } from "../../schemas/loginSchema";
import LoginForm from "../components/LoginForm";
import { useAdminLogin } from "../../hooks/useAdminLogin";
import Image from "next/image";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();
  const { mutate: login, isPending, error: loginError } = useAdminLogin();
  const { isAuthenticated, setUser } = useAuthStore1();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/issuers");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (values: LoginFormValues) => {
    const { email, password } = values;
    login(
      { email, password },
      {
        onSuccess: (data) => {
          toast.success("Login successful");
          router.push("/assets");
          setUser(data.user);
        },
        onError: (error: any) => {
          toast.error(error?.message || "Login failed");
          console.log("Login error:", error);
        },
      }
    );
  };

  return (
    <div className="min-h-screen font-poppins flex items-center justify-center bg-linear-to-br from-blue-50 to-orange-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-30 h-30  relative rounded-full flex items-center justify-center mb-4">
            {/* <span className="text-white text-2xl font-bold">N</span> */}
            <Image
              className="object-contain"
              src={`/assets/logo/Web-06.png`}
              alt="yob-logo"
              fill
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Admin Portal</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {loginError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
            {loginError}
          </div>
        )}

        <LoginForm onSubmit={handleLogin} isLoading={isPending} />

        <div className="mt-6 text-center text-sm text-gray-600" />
      </div>
    </div>
  );
};

export default LoginPage;
