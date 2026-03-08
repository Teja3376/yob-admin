import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetProfile() {
  return useQuery({
    queryKey: ["admin-profile"],
    queryFn: async () => {
      const response = await api.get("/auth/profile");
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
  });
}
