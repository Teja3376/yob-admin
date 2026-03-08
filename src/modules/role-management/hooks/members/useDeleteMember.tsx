import api from "@/config/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export default function useDeleteMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-member"],
    mutationFn: async (id: string) => {
      const response = await api.delete(`/members/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-members"] });
    },
  });
}

  
