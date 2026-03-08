import api from "@/config/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateRoleData {
  name: string;
  description: string;
  permissions: Record<string, any>;
}

export default function useDeleteRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-role"],
    mutationFn: async (id: string) => {
      const response = await api.delete(`/roles/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-roles"] });
    },
  });
}

  
