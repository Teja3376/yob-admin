import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";

export interface OrderFilters {
  page?: number;
  limit?: number;
  search?: string;
  fromDate?: string;
  toDate?: string;
  minAmount?: number;
  maxAmount?: number;
  status?: string;
}

interface ErrorResponse {
  message?: string;
}

export const useOrderList = (filters: OrderFilters) => {
  return useQuery({
    queryKey: ["order-list", filters],
    queryFn: async () => {
      try {
        const res = await api.get("/orders", {
          params: filters,
        });

        return res.data;
      } catch (error: unknown) {
        const err = error as AxiosError<ErrorResponse>;
        toast.error(
          err.response?.data?.message || "Failed to fetch orders"
        );
      }
    },
    staleTime: 1000 * 60 * 1,
  });
};