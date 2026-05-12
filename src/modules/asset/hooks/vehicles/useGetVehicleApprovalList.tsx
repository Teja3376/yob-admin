import api from "@/config/httpClient";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type AssetApprovalStatus = "pending" | "approved" | "rejected" | string;

export type VehicleApprovalListItem = {
  _id: string;
  issuerId: string;
  assetId: {
    _id: string;
    blockchain?: {
      assetAddress: string;
      assetManagerAddress: string;
      orderManagerAddress: string;
    };
    status: string;
  };

  issuername: string;
  vehicleBrand: string;
  vehicleModel: string;
  status: string;
  issuerComments?: string;
  createdAt: string;
  updatedAt: string;
  rejectionReason?: string;
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

export type VehicleApprovalListResponse = {
  success: boolean;
  data: VehicleApprovalListItem[];
  pagination: Pagination;
};

export type UseGetVehicleApprovalListParams = {
  page?: number;
  limit?: number;
  status?: AssetApprovalStatus;
  search?: string;
  issuerStatus?: string;
};

type QueryOptions = Omit<
  UseQueryOptions<VehicleApprovalListResponse>,
  "queryKey" | "queryFn"
>;

export const useGetVehicleApprovalList = (
  params: UseGetVehicleApprovalListParams = {},
  options?: QueryOptions,
) => {
  const {
    page = 1,
    limit = 10,
    status = "pending",
    search = "",
    issuerStatus,
  } = params;
  return useQuery({
    queryKey: [
      "vehicle-approval-list",
      page,
      limit,
      status,
      search,
      issuerStatus,
    ],
    queryFn: async () => {
      const res = await api.get<VehicleApprovalListResponse>("/vehicles/list", {
        params: {
          page,
          limit,
          status,
          ...(search ? { search } : {}),
          ...(issuerStatus && issuerStatus !== "all" ? { issuerStatus } : {}),
        },
      });
      return res.data;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 3,
    ...options,
  });
};
