import api from "@/config/httpClient";
import { useMutation } from "@tanstack/react-query";

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async ({
      token,
      password,
    }: {
      token: string;
      password: string;
    }) => {
      const response = await api.post(`/members/reset-password?token=${token}`, {
        password,
      });

      return response.data;
    },
    onError: (error: any) => {
      console.error("Reset password error:", error);
    },
  });
};