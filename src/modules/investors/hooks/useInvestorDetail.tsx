import { useQuery } from "@tanstack/react-query";
import api from "@/config/httpClient";

export const useInvestorDetail = (investorId: string) => {
    return useQuery({
        queryKey: ["investor-detail", investorId],
        queryFn: async () => {
            const res = await api.get(`/investor/${investorId}`);
            return res.data;
        },
    });
};