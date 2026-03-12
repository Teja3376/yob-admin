import api from "@/config/httpClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetIssuerList = (
  status: string,
  page: number,
  limit: number,
  searchTerm: string,
) => {
  return useQuery({
    queryKey: ["issuer-list", status, page, limit, searchTerm],
    queryFn: async () => {
      const res = await api.get("/issuers/list", {
        params: { status, page, limit, search: searchTerm },
      });
      return res.data;
    },
    staleTime: 1 * 60 * 1000,
    refetchOnWindowFocus: false,

    retry: 3,
  });
};

export const useGetIssuerById = (issuerId: string) => {
  return useQuery({
    queryKey: ["issuer-details", issuerId],
    queryFn: async () => {
      const res = await api.get(`/issuers/${issuerId}`);
      return res.data.data;
    },

    staleTime: 1 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
    enabled: !!issuerId,
  });
};

export const useUpdateIssuerStatus = (issuerId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      status,
      rejectionReason,
    }: {
      status: "approved" | "rejected";
      rejectionReason?: string;
    }) => {
      const res = await api.patch(`/issuers/${issuerId}/status`, {
        status,
        rejectionReason,
      });

      return res.data.data;
    },

    mutationKey: ["update-issuer-status", issuerId],

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issuer-details", issuerId] });
      queryClient.invalidateQueries({ queryKey: ["issuer-list"] });
    },
  });
};
