import { useQuery } from "@tanstack/react-query";
import api from "@/config/httpClient";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { OrderDetail } from "../types/OrderDetail";

interface ErrorResponse {
  message?: string;
}


export const useOrderDetail = (orderId: string) => {
  return useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: async () => {
      try {
        const res = await api.get(`/orders/${orderId}`);
        return res?.data?.data?.order as OrderDetail;
      } catch (error: unknown) {
        const err = error as AxiosError<ErrorResponse>;
        toast.error(err.response?.data?.message || "Failed to fetch order details");
        return null;
      }
    },
    enabled: !!orderId,
    staleTime: 1000 * 60 * 1,
  });
};