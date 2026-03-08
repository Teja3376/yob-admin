import api from "@/config/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateMemberData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function useCreateMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-member"],
    mutationFn: async (data: CreateMemberData) => {
      const response = await api.post("/members/create", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-members"] });
    },
  });
}
