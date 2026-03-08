import api from "@/config/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateRoleData {
  name: string;
  description: string;
  permissions: Record<string, any>;
}

export default function useCreateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-role"],
    mutationFn: async (data: CreateRoleData) => {
      const response = await api.post("/roles/create", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-roles"] });
    },
  });
}
