"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResetPassword } from "../../hooks/useAdminResetPassword";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { toast } from "sonner";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
    mode: "onSubmit",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: reset, isPending: isLoading, error } = useResetPassword();

  const onSubmit = (values: ResetPasswordFormValues) => {
    if (token) {
      reset(
        { token, password: values.password },
        {
          onSuccess: () => {
            form.reset();
            toast.success("Reset Successfully");
            router.push("/login");
          },
          onError: (err: any) => {
            console.error("Reset failed:", err);
            toast.error(err?.response?.data?.message || "Reset Failed");
          },
        },
      );
    }
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
          <h1 className="text-2xl font-semibold text-gray-900">
            Reset your password
          </h1>
        </div>

        {/* {loginError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
            {loginError.message}
          </div>
        )} */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        disabled={isLoading}
                        {...field}
                        className="pr-10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <LoaderCircle className="animate-spin mr-2" />}{" "}
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-xs">
              {error.message}
            </div>
          )}
        </Form>

        <div className="mt-6 text-center text-sm text-gray-600" />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
