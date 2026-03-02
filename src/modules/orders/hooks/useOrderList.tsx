import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

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

export const useOrderList = (filters: OrderFilters) => {
  return useQuery({
    queryKey: ["order-list", filters],
    queryFn: async () => {
      const res = await api.get("/orders", {
        params: filters,
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 1,
  });
};