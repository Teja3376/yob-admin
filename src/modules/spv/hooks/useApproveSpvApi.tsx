import { useMutation } from "@tanstack/react-query";
import api from "@/config/httpClient";
import { toast } from "sonner";

interface SendStatusPayload {
  spvId: string;
  status?: string; // default "Pending"
  blockchain: {
    txHash: string;
    spvAddress: string;
    daoAddress?: string;
  };
}

const useApproveSpvApi = () => {
  return useMutation({
    mutationKey: ["approve-spv"],
    mutationFn: async ({
      spvId,
      status = "Pending",
      blockchain,
    }: SendStatusPayload) => {
      const res = await api.patch(
        `/spv-status/update`,
        { status, blockchain },
        { params: { spvId } },
      );
      return res.data;
    },
    onSuccess: (data: any) => {
      toast.success(data?.message || "SPV status sent successfully");
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to send SPV status";
      toast.error(message);
    },
  });
};

export default useApproveSpvApi;
