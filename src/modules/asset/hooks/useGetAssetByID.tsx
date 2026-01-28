import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

export type AdminAsset = any;

type AdminAssetResponse = {
  data: AdminAsset;
  message?: string;
};

export default function useGetAssetById(assetId: string) {
  return useQuery({
    queryKey: ["admin-asset-by-id", assetId],
    queryFn: async () => {
      const res = await api.get<AdminAssetResponse>(`/admin/assets/${assetId}`);
      return res.data.data;
    },
    enabled: !!assetId,
    staleTime: 3000,
  });
}

