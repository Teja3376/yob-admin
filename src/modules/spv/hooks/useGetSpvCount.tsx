import { useQuery } from "@tanstack/react-query";
import api from "@/config/httpClient";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useGetSpvCount = () => {
    return useQuery({
        queryKey: ["spv-count"],
        queryFn: async () => {
            try {
                const res = await api.get("/spv-status/status-count");
                return res.data;
            } catch (error) {
                toast.error((error as AxiosError)?.message || "Error fetching spv count");
                return {
                    total: 0,
                    active: 0,
                    pending: 0,
                };
            }
        },
        staleTime: 1 * 60 * 1000,
        retry: 3,
        refetchOnWindowFocus: false,
    });
}