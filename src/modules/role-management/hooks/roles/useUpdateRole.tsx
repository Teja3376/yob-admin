import api from "@/config/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateRoleData {
  name: string;
  description: string;
  permissions: Record<string, any>;
}

export default function useUpdateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-role"],
    mutationFn: async ({id, body}:{id:string,body:CreateRoleData}) => {
      const response = await api.put(`/roles/update/${id}`, body);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-roles"] });
    },
  });
}
