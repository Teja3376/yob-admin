import { useQuery } from "@tanstack/react-query";
import api from "@/config/httpClient";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useGetAssetCount = () => {
    return useQuery({
        queryKey: ["asset-count"],
        queryFn: async () => {
            try {
                const res = await api.get("/asset-approval/status-count");
                return res.data;
            } catch (error) {
                toast.error((error as AxiosError)?.message || "Error fetching asset count");
                return {
                    total: 0,
                    approved: 0,
                    pending: 0,
                    rejected: 0,
                };
            }
        },
        staleTime: 1 * 60 * 1000,
        retry: 3,
        refetchOnWindowFocus: false,
    });
}