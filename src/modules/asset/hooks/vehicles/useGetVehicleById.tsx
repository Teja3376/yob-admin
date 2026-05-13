import api from "@/config/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetVehicleById(vehicleId: string) {
  return useQuery({
    queryKey: ["vehicle", vehicleId],
    queryFn: async () => {
        const res = await api.get(`/vehicles/vh/${vehicleId}`);
        return res.data;
    },

    staleTime: 5 * 60 * 1000, 
    retry: 3,
    enabled: !!vehicleId, 
    refetchOnWindowFocus: false, 
  });
}
