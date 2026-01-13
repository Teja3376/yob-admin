import api from "@/config/httpClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetIssuerList = () => {
  return useQuery({
    queryKey: ["issuer-list"],
    queryFn: async () => {
      const res = await api.get("/issuers/list");
      return res.data.data;
    },
    staleTime: 1 * 60 * 1000,
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
  });
};

export const useUpdateIssuerStatus = (issuerId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (status: string) => {
      const res = await api.patch(`/issuers/${issuerId}/status`, { status });
      return res.data.data;
    },
    mutationKey: ["update-issuer-status","issuer-list", issuerId,],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issuer-details", issuerId] });
    },
  });
};
