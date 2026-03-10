import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

export const useGetInvestors = (
  spvId: string,
  page: number = 1,
  limit: number = 10,
  searchTerm: string,
) => {
  return useQuery({
    queryKey: ["dashboard-investors", spvId, page, limit, searchTerm],
    queryFn: async () => {
      const response = await api.get(
        `/spv-status/investors/${spvId}?page=${page}&limit=${limit}&search=${searchTerm}`,
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!spvId,
  });
};
