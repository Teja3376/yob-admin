import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

export const useGetInvestorsStats = (spvId: string) => {
  return useQuery({
    queryKey: ["dashboard-investors-stats",spvId],
    queryFn: async () => {
      const response = await api.get(`/spv-status/investors-stats/${spvId}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!spvId,
  });
};
