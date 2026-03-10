import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

export const useGetOrdersCount = (spvId: string) => {
  return useQuery({
    queryKey: ["OrdersCount",spvId],
    queryFn: async () => {
      const response = await api.get(`/spv-status/orders/status-count/${spvId}`);
      console.log("Orders Count", response);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!spvId,
  });
};
