import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetIssuerAssets(
  issuerId: string,
  page: number = 1,
  limit: number = 10,
  searchQuery: string = "",
) {
  return useQuery({
    queryKey: ["issuer-asset-list", issuerId,page,limit,searchQuery],
    queryFn: async () => {
      const res = await api.get(`/issuers/assets/${issuerId}`, {
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
