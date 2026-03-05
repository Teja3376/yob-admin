import { useQuery } from "@tanstack/react-query";
import api from "@/config/httpClient";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface ErrorResponse {
  message?: string;
}
export const useOrderCount = () => {
  return useQuery({
    queryKey: ["order-count"],
    queryFn: async () => {
      try {
        const res = await api.get("/orders/order-count");
        return res.data;
      } catch (error: unknown) {
        const err = error as AxiosError<ErrorResponse>;
        toast.error(err.response?.data?.message || "Failed to fetch order count");
        return null;
      }
    },
  });
};