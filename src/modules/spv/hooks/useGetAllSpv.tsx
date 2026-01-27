import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

type SpvStatus = "Pending" | "Approval" | "Rejected" | string;

type SpvListItem = {
  _id: string;
  issuerId: string;
  spvId: string;
  issuername: string;
  spvname: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Pagination = {
  page: number;
  limit: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
  totalPages: number;
};

type SpvListResponse = {
  success: boolean;
  data: SpvListItem[];
  pagination: Pagination;
};

type UseGetAllSpvParams = {
  page?: number;
  limit?: number;
  status?: SpvStatus;
};

export const useGetAllSpv = (params: UseGetAllSpvParams = {}) => {
  const { page = 1, limit = 10, status = "Pending" } = params;

  return useQuery({
    queryKey: ["spv-list", page, limit, status],
    queryFn: async () => {
      const res = await api.get<SpvListResponse>("/spv-status/list", {
        params: {
          page,
          limit,
          status,
        },
      });
      return res.data;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 3,
  });
};

export type { SpvListItem, Pagination, SpvListResponse, UseGetAllSpvParams };
