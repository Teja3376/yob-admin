import { useMutation } from "@tanstack/react-query";
import api from "@/config/httpClient";
import { toast } from "sonner";

interface ApproveAssetPayload {
  assetId: string;
  status?: string; // default "pending"
  blockchain?: {
    assetAddress: string;
    assetManagerAddress: string;
    orderManagerAddress: string;
    spvIdHash: string;
    assetIdHash: string;
  };
  rejectionReason?: string;
}

const useApproveVehicle = () => {
  return useMutation({
    mutationKey: ["approve-vehicle"],
    mutationFn: async ({
      assetId,
      status = "pending",
      blockchain,
      rejectionReason
    }: ApproveAssetPayload) => {
      const res = await api.patch(
        `/vehicles/update`,
        { status, blockchain,rejectionReason },
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

export default useApproveVehicle;
