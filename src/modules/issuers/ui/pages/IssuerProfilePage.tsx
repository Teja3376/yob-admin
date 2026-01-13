"use client";
import React from "react";
import { useParams } from "next/navigation";
import {
  useGetIssuerById,
  useUpdateIssuerStatus,
} from "../../hooks/issuer.hook";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import IssuerApplicationInfo from "../components/IssuerApplicationInfo";
import AssetInfo from "../components/AssetInfo";
import IssuerInfo from "../components/IssuerInfo";
import TimeLine from "../components/TimeLine";
import KybVerificationStatus from "../components/KybVerificationStatus";
import SubmitDecision from "../components/SubmitDecision";
import { toast } from "sonner";

const IssuerProfilePage = () => {
  const { issuerId } = useParams();
  const router = useRouter();
  const {
    data: issuer,
    isFetching,
    error,
  } = useGetIssuerById(issuerId as string);
  const {
    mutate: updateIssuerStatus,
    isPending,
    error: updateStatusError,
  } = useUpdateIssuerStatus(issuerId as string);
  console.log({ issuer });
  const handleUpdateStatus = (status: "approved" | "rejected") => {
    updateIssuerStatus(status, {
      onSuccess: () => {
        toast.success(
          `Application ${status === "approved" ? "approved" : "rejected"}`
        );
      },
      onError: () => {
        toast.error("Failed to update application status");
      },
    });
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center mt-20">
        <LoaderCircle size={40} className="animate-spin text-primary" />
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center gap-2">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <div>
          <h1 className="text-xl font-semibold">
            {issuer?.application.legalEntityName}
          </h1>
          <p className="text-xs text-muted-foreground">Application Review</p>
        </div>
      </div>
      <div className="flex gap-5 w-full mt-10 ">
        <div className="flex-1 space-y-5">
          <>
            {" "}
            <IssuerApplicationInfo
              applicationId={issuer?.application.applicationId || ""}
              legalEntityName={issuer?.application.legalEntityName || ""}
              countryOfIncorporation={
                issuer?.application.countryOfIncorporation || ""
              }
              email={issuer?.application.email || ""}
            />
          </>
          <>
            {" "}
            <AssetInfo
              assetDescription={issuer?.application.shortAssetDescription || ""}
              assetCategory={issuer?.application.assetCategory || ""}
            />
          </>
          <>
            <IssuerInfo
              firstName={issuer?.issuer.firstName || ""}
              lastName={issuer?.issuer.lastName || ""}
              isEmailVerified={issuer?.issuer.isEmailVerified || false}
              email={issuer?.issuer.email || ""}
            />
          </>
        </div>
        <div className="w-[30%] space-y-5">
          <SubmitDecision
            status={issuer?.application.status || "pending"}
            onApprove={() => handleUpdateStatus("approved")}
            onReject={() => handleUpdateStatus("rejected")}
            disabled={isPending}
          />{" "}
          <TimeLine
            createdAt={issuer?.application.createdAt || ""}
            status={issuer?.application.status || "pending"}
          />
          <KybVerificationStatus
            isKybVerified={issuer?.issuer.kycStatus || false}
          />
        </div>
      </div>
    </div>
  );
};

export default IssuerProfilePage;
