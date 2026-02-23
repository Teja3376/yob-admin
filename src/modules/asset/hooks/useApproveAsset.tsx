import { useMutation } from "@tanstack/react-query";
import api from "@/config/httpClient";
import { toast } from "sonner";

interface ApproveAssetPayload {
  assetId: string;
  status?: string; // default "pending"
  blockchain?: {
    assetAddress: string;
    assetManager: string;
    orderManager: string;
    spvIdHash: string;
    assetIdHash: string;
  };
}

const useApproveAsset = () => {
  return useMutation({
    mutationKey: ["approve-asset"],
    mutationFn: async ({
      assetId,
      status = "pending",
      blockchain,
    }: ApproveAssetPayload) => {
      const res = await api.patch(
        `/asset-approval/update`,
        { status, blockchain },
        { params: { assetId } },
      );
      return res.data;
    },
    onSuccess: (data: any) => {
      toast.success(data?.message || "Asset status updated successfully");
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update asset status";
      toast.error(message);
    },
  });
};

export default useApproveAsset;
