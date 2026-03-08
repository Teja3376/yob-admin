import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllRoleNames(status: string) {
  return useQuery({
    queryKey: ["get-all-roles-names", status],
    queryFn: async () => {
      const response = await api.get("/roles/all/names", {
        params: { status },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
}
