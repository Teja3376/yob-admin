import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

type AssetApprovalStatus = "pending" | "approved" | "rejected" | string;

export type AssetApprovalListItem = {
  _id: string;
  issuerId: string;
  assetId:
     {
        name: string;
        _id: string;
        blockchain?: {
          assetAddress: string;
          assetManagerAddress: string;
          orderManagerAddress: string;
        };
      };

  issuername: string;
  assetName: string;
  status: string;
  issuerComments?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Pagination = {
  page: number;
  limit: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
  totalPages: number;
};

export type AssetApprovalListResponse = {
  success: boolean;
  data: AssetApprovalListItem[];
  pagination: Pagination;
};

export type UseGetAllAssetParams = {
  page?: number;
  limit?: number;
  status?: AssetApprovalStatus;
  search?: string;
};

export const useGetAllAsset = (params: UseGetAllAssetParams = {}) => {
  const { page = 1, limit = 10, status = "pending", search = "" } = params;
  return useQuery({
    queryKey: ["asset-approval-list", page, limit, status, search],
    queryFn: async () => {
      const res = await api.get<AssetApprovalListResponse>(
        "/asset-approval/list",
        {
          params: {
            page,
            limit,
            status,
            ...(search ? { search } : {}),
          },
        },
      );
      return res.data;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 3,
  });
};
