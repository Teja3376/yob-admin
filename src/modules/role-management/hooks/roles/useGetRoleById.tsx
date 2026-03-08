import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetRoleById(id: string) {
  return useQuery({
    queryKey: ["get-role", id],
    queryFn: async () => {
      const response = await api.get(`/roles/${id}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
    retry: 3,
    refetchOnWindowFocus: false,
  });
}
