"use client";

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

const SpvPage = () => {
  const router = useRouter();
  const { spvId } = useParams();
  const { data: spvData, isLoading, isError, error } = useGetSpvById(
    spvId as string
  );

  const handleRequestUpdate = () => {
    // Handle request update logic
    console.log("Request to update");
  };

  const handleApprove = () => {
    // Handle approve logic
    console.log("Approve");
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
        <h1 className="text-xl font-medium">SPV Details</h1>
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
      />
    </div>
  );
};

export default SpvPage;
