import { useQuery } from "@tanstack/react-query";
import api from "@/config/httpClient";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface ErrorResponse {
  message?: string;
}
export const useOrderCount = () => {
  return useQuery({
    queryKey: ["order-count"],
    queryFn: async () => {
      const res = await api.get("/orders/order-count");
      return res.data;
    },
    staleTime: 1000 * 60 * 1,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
