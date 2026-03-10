import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

export const useGetOverview = (spvId:string) => {
  return useQuery({
    queryKey: ["dashboard-overview",spvId],
    queryFn: async () => {
      const response = await api.get(`/spv-status/details/${spvId}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!spvId,
  });
};
