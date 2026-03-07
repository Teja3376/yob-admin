import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetIssuerInvestors(
  issuerId: string,
  page: number = 1,
  limit: number = 10,
  searchQuery: string = "",
) {
  return useQuery({
    queryKey: ["issuer-investor-list", issuerId,page,limit,searchQuery],
    queryFn: async () => {
      const res = await api.get(`/issuers/investors/${issuerId}`, {
        params: {
          page,
          limit,
          search: searchQuery? searchQuery : "",
        },
      });
      return res.data;
    },
    staleTime: 1 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!issuerId,
    retry: 3,
  });
}
