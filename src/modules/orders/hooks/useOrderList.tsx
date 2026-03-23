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

  status?: string;
}

interface ErrorResponse {
  message?: string;
}

export const useOrderList = (filters: OrderFilters) => {
 

  return useQuery({
    queryKey: [
      "order-list",
      filters.page,
      filters.limit,
      filters.status,
      filters.search,
      filters.fromDate,
      filters.toDate,
    ],
    queryFn: async () => {
      const res = await api.get("/orders", {
        params: filters,
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 1,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
