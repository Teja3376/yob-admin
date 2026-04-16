"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";
import SpvBasicInfo from "@/modules/spv/ui/components/SpvBasicInfo";
import SpvMemoTerms from "@/modules/spv/ui/components/SpvMemoTerms";
import SpvEscrowBankDetails from "@/modules/spv/ui/components/SpvEscrowBankDetails";
import SpvLegalDocuments from "@/modules/spv/ui/components/SpvLegalDocuments";
import SpvBoardMembers from "@/modules/spv/ui/components/SpvBoardMembers";
import SpvDaoDetails from "@/modules/spv/ui/components/SpvDaoDetails";
import SpvActionButtons from "@/modules/spv/ui/components/SpvActionButtons";
import useGetSpvById from "../../hooks/useGetSpvWithId";
import ApprovalDialog from "../components/ApprovalDialog";
import useApproveSpvApi from "../../hooks/useApproveSpvApi";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useDeploySpv } from "../../hooks/useDeploySpv";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import RejectApprovalDialog from "../components/RejectionDialog";
import SpvStatus from "../components/SpvStatus";
import ErrorPage from "@/components/Error";

const SpvPage = () => {
  const router = useRouter();
  const { spvId } = useParams();
  const { hasPermission } = useAuthStore1();
  const canDoAction = hasPermission("spvs", "action");
  const canDoReview = hasPermission("spvs", "review");

  const {
    data: spvData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetSpvById(spvId as string);
  const {
    mutate: approveSpv,
    isPending: approvalPending,
    isError: isApprovalError,
    error: approvalError,
  } = useApproveSpvApi();
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const { handleDeploySpv } = useDeploySpv();
  const [loading, setIsLoading] = useState(false);

  const handleRequestUpdate = () => {
    // Handle request update logic
  };

  const handleApprove = () => {
    setIsApproveDialogOpen(true);
  };

  const handleConfirmApprove = async () => {
    const result = await handleDeploySpv(spvData, setIsLoading);

    const blockChain = {
      txHash: result?.txHash || "",
      spvAddress: result?.spvAddress || "",
      daoAddress: "",
    };

    if (!result?.txHash || !result?.spvAddress) {
      toast.error("Failed to deploy SPV on blockchain. Approval aborted.");
      return;
    }

    approveSpv(
      { spvId: spvId as string, status: "Active", blockchain: blockChain },
      {
        onSuccess: () => {
          toast.success("SPV approved successfully");
          setIsApproveDialogOpen(false);
          refetch();
        },
        onError: () => {
          toast.error("Failed to approve SPV");
        },
      },
    );
  };

  const handleReject = (reason: string) => {
    approveSpv(
      { spvId: spvId as string, status: "Rejected", rejectionReason: reason },
      {
        onSuccess: () => {
          toast.success("SPV rejected successfully");
          setIsRejectDialogOpen(false);
          refetch();
        },
        onError: () => {
          toast.error("Failed to reject SPV");
        },
      },
    );
  };

  const getStatusBadge = (status: string) => {
    const statusLower = status?.toLowerCase() || "";

    if (statusLower === "active") {
      return (
        <Badge className="bg-green-500 text-white hover:bg-green-600">
          Approved
        </Badge>
      );
    }

    if (statusLower === "rejected") {
      return (
        <Badge className="bg-red-500 text-white hover:bg-red-600">
          Rejected
        </Badge>
      );
    }

    return (
      <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
        Pending
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-20">
        <LoaderCircle size={40} className="animate-spin text-primary" />
      </div>
    );
  }

  if (isError && !spvData) {
    return (
      <ErrorPage
        title="Error Gathering Spv Data"
        errorMessage={error?.message || "Unknown error"}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageTitle title={spvData.name || "Detailed view of spv"} suffix="SPV" />
      {/* Header */}
      <div className="">
        <div className="flex items-center gap-2">
          <ArrowLeft
            onClick={() => router.back()}
            className="cursor-pointer"
            size={20}
          />
          <h1 className="text-xl font-semibold">{spvData.name}</h1>
        </div>
        <p className="pl-6">{getStatusBadge(spvData.status)}</p>
        {spvData.status === "Active" &&
          canDoReview &&
          spvData.isAssetLinked && (
            <Button
              variant="outline"
              className="hover:underline"
              onClick={() => router.push(`/spv-list/${spvId}/overview`)}
            >
              Go To Dashboard <ArrowRight size={16} className="ml-1" />
            </Button>
          )}
      </div>

      {/* Basic Information */}
      {(spvData.status === "Active" || spvData.status === "Rejected") && (
        <SpvStatus 
         data={spvData} />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">

        <div className="lg:col-span-7 space-y-6">
          <SpvBasicInfo
            name={spvData.name}
            type={spvData.type}
            jurisdiction={spvData.jurisdiction}
            currency={spvData.currency}
            formationDate={spvData.formationDate}
          />

          <SpvMemoTerms memoAndTerms={spvData.memoAndTerms} />

          <SpvBoardMembers boardMembers={spvData.boardMembers} />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <SpvEscrowBankDetails escrowBankDetails={spvData.escrowBankDetails} />

          <SpvLegalDocuments legalDocuments={spvData.legalDocuments} />

          <SpvDaoDetails blockchain={spvData.blockchain} />
        </div>
      </div>

      {/* Action Buttons */}
      { spvData.status == "Approved" || spvData.status == "Rejected" && <SpvActionButtons
      
        onApprove={handleApprove}
        status={spvData.status}
        reason={spvData?.rejectionReason}
        canDoAction={canDoAction}
        onReject={() => setIsRejectDialogOpen(true)}
      />}

      {/* Approve Dialog */}
      <ApprovalDialog
        open={isApproveDialogOpen}
        onOpenChange={setIsApproveDialogOpen}
        onConfirmApprove={handleConfirmApprove}
        isLoading={approvalPending || loading}
        isError={isApprovalError}
        errorMessage={approvalError?.message || "Unknown error during approval"}
      />
      <RejectApprovalDialog
        open={isRejectDialogOpen}
        setOpen={setIsRejectDialogOpen}
        onReject={(reason) => handleReject(reason)}
        isLoading={approvalPending}
        isError={isApprovalError}
        errorMessage={approvalError?.message || "Unknown error during approval"}
      />
    </div>
  );
};

export default SpvPage;
