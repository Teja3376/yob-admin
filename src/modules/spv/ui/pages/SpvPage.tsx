"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, LoaderCircle } from "lucide-react";
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


const SpvPage = () => {
  const router = useRouter();
  const { spvId } = useParams();
  const { data: spvData, isLoading, isError, error, refetch } = useGetSpvById(
    spvId as string
  );
  const { mutate: approveSpv } = useApproveSpvApi();
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);

  const handleRequestUpdate = () => {
    // Handle request update logic
    console.log("Request to update");
  };

  const handleApprove = () => {
    setIsApproveDialogOpen(true);
  };

  const handleConfirmApprove = () => {
    approveSpv({ spvId: spvId as string, status: "Active" }, {
      onSuccess: () => {
        toast.success("SPV approved successfully");
        setIsApproveDialogOpen(false);
        refetch();
      },
      onError: () => {
        toast.error("Failed to approve SPV");
      },
    });
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

  if (isError || !spvData) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-red-500">
          Error loading SPV details: {error?.message || "SPV not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
   <div className="flex items-center gap-2">
        <ArrowLeft
          onClick={() => router.back()}
          className="cursor-pointer"
          size={20}
        />
        <h1 className="text-xl font-medium">{spvData.name}</h1>
        {getStatusBadge(spvData.status)}
      </div>   

      {/* Basic Information */}
      <SpvBasicInfo
        name={spvData.name}
        type={spvData.type}
        jurisdiction={spvData.jurisdiction}
        currency={spvData.currency}
        formationDate={spvData.formationDate}
      />

      {/* Memo & Terms */}
      <SpvMemoTerms memoAndTerms={spvData.memoAndTerms} />

      {/* Escrow Bank Details */}
      <SpvEscrowBankDetails escrowBankDetails={spvData.escrowBankDetails} />

      {/* Legal Documents */}
      <SpvLegalDocuments legalDocuments={spvData.legalDocuments} />

      {/* Additional Board Members */}
      <SpvBoardMembers boardMembers={spvData.boardMembers} />

      {/* DAO Details */}
      <SpvDaoDetails daoConfiguration={spvData.daoConfiguration} />

      {/* Action Buttons */}
      <SpvActionButtons
        onRequestUpdate={handleRequestUpdate}
        onApprove={handleApprove}
        isApproved={spvData.status === "Active"}
      />

      {/* Approve Dialog */}
     <ApprovalDialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen} onConfirmApprove={handleConfirmApprove} />
    </div>
  );
};

export default SpvPage;
