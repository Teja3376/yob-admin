import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetSpvById(spvId: string) {
  return useQuery({
    queryKey: ["get-spv-by-id", spvId],

    queryFn: async () => {
      const response = await api.get(`/spvs/${spvId}`);
      return response.data.data;
    },
    enabled: !!spvId,
    staleTime: 3000,
  });
}
