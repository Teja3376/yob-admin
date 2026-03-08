import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface InvestorListParams {
  page: number;
  limit: number;
  search?: string;
  fromDate?: string;
  toDate?: string;
}

interface ErrorResponse {
  message?: string;
}
export const useInvestorList = ({
  page,
  limit,
  search,
  fromDate,
  toDate,
}: InvestorListParams) => {
  return useQuery({
    queryKey: ["investor-list", page, limit, search, fromDate, toDate],

    queryFn: async () => {
      const res = await api.get("/investor/list", {
        params: {
          search,
          page,
          limit,
          fromDate,
          toDate,
        },
      });
      return res.data;
    },
    staleTime: 1000 * 60,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
