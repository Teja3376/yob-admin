import api from "@/config/httpClient";
import { useMutation } from "@tanstack/react-query";

export const useAdminLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      return response.data;
    },
    onError: (error: any) => {
      console.error("Login error:", error);
    },
  });
};
