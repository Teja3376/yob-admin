import api from "@/config/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateMemberData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function useUpdateMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-member"],
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: CreateMemberData;
    }) => {
      const response = await api.put(`/members/update/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-members"] });
    },
  });
}
