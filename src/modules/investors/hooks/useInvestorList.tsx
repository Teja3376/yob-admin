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
      try {
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
      } catch (error: unknown) {
        const err = error as AxiosError<ErrorResponse>;
        toast.error(err.response?.data?.message || "Failed to fetch investor list");
        return null;
      }
    },
    staleTime: 1000 * 60,
  });
};