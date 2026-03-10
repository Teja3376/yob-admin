import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = (
  spvId: string,
  page: number = 1,
  limit: number = 10,
  searchQuery: string = "",
  fromDate?: Date,
  toDate?: Date,
) => {
  return useQuery({
    queryKey: [
      "dashboard-orders",
      spvId,
      page,
      limit,
      searchQuery,
      fromDate,
      toDate,
    ],
    queryFn: async () => {
      const response = await api.get(`/spv-status/orders/${spvId}`, {
        params: {
          page,
          limit,
          search: searchQuery,
          status,
          fromDate: fromDate ? fromDate.toISOString() : undefined,
          toDate: toDate ? toDate.toISOString() : undefined,
        },
      });
      console.log("OrdersDetails", response);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!spvId,
  });
};
