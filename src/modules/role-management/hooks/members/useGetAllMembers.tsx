import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllMembers(
  page: number,
  limit: number,
  searchTerm: string,
) {
  return useQuery({
    queryKey: ["get-all-members", page, limit, searchTerm],
    queryFn: async () => {
      const response = await api.get("/members/all", {
        params: { page, limit, search: searchTerm },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
}
