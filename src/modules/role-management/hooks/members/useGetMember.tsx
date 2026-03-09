import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetMemberById(id: string) {
  return useQuery({
    queryKey: ["get-member", id],
    queryFn: async () => {
      const response = await api.get(`/members/${id}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
    retry: 3,
    refetchOnWindowFocus: false,
  });
}
