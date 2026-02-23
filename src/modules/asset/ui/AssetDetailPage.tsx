"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetDetailHeader } from "../components/AssetDetail/AssetdetailHeader";
import { PropertyOverview } from "../components/AssetDetail/Propertyoverview";
import { FinancialDetails } from "../components/AssetDetail/FinancialDetails";
// import { AmenitiesAndFeatures } from '../components/AssetDetail/AmenitiesAndFeatures';
import { DocumentsAndTenants } from "../components/AssetDetail/DocumentsAndTenants";
import { RiskAndAdditionalInfo } from "../components/AssetDetail/RiskAndAdditionalInfo";
import { AmenitiesAndFeatures } from "../components/AssetDetail/AmenitiesAndFeatures";
import useGetAssetById from "../hooks/useGetAssetByID";
import { LoaderCircle } from "lucide-react";
import AssetApprovalDialog from "../components/AssetApprovalDialog";
import useApproveAsset from "../hooks/useApproveAsset";
import { toast } from "sonner";
import { useDeployAsset } from "../hooks/useDeployAsset";

export default function AssetDetailPage() {
  const { assetId } = useParams();
  const {
    data: assetData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAssetById(assetId as string);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const { handleDeployAsset } = useDeployAsset();
  const { mutate: approveAsset, isPending: isApproving } = useApproveAsset();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-20">
        <LoaderCircle size={40} className="animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !assetData) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-red-500">
          Error loading Asset details: {error?.message || "Asset not found"}
        </p>
      </div>
    );
  }

  const location = `${assetData.city}, ${assetData.state} • ${assetData.landmark}`;
  const isAlreadyApproved =
    (assetData.status || "").toLowerCase() === "approved" ||
    (assetData.status || "").toLowerCase() === "active";

  const handleRequestUpdate = () => {
    toast.info("Request update clicked");
  };

  const handleApproveClick = () => {
    setIsApproveDialogOpen(true);
  };

  const handleConfirmApprove = async () => {
    const result = await handleDeployAsset(assetData);
    console.log("Deploy Asset Result:", result);

    const blockchain = {
      assetAddress: result?.asset || "",
      assetManager: result?.assetManager || "",
      orderManager: result?.orderManager || "",
      spvIdHash: result?.spvIdHash || "",
      assetIdHash: result?.assetIdHash || "",
      txHash: result?.txHash || "",
    };
    approveAsset(
      { assetId: assetId as string, status: "approved", blockchain },
      {
        onSuccess: () => {
          setIsApproveDialogOpen(false);
          refetch();
        },
      },
    );
  };

  return (
    <main className="min-h-screen ">
      <div className="mx-auto">
        {/* Header Section */}
        <AssetDetailHeader
          name={assetData.name}
          location={location}
          status={assetData.status as "pending" | "approved" | "active"}
          imageUrl={assetData?.media?.imageURL}
          stage={assetData.stage}
          onRequestUpdate={handleRequestUpdate}
          onApprove={handleApproveClick}
          approveDisabled={isAlreadyApproved || isApproving}
        />

        <AssetApprovalDialog
          open={isApproveDialogOpen}
          onOpenChange={setIsApproveDialogOpen}
          onConfirmApprove={handleConfirmApprove}
          isLoading={isApproving}
        />

        {/* Tabs for Different Sections */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit text-black ">
            <TabsTrigger
              value="overview"
              className="text-black font-medium   data-[state=active]:text-black data-[state=active]:font-medium "
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="financial"
              className="text-black  font-medium data-[state=active]:text-black data-[state=active]:font-medium"
            >
              Financial
            </TabsTrigger>
            <TabsTrigger
              value="assets"
              className="text-black font-medium  data-[state=active]:text-black data-[state=active]:font-medium"
            >
              Assets
            </TabsTrigger>
            <TabsTrigger
              value="risk"
              className="text-black font-medium  data-[state=active]:text-black data-[state=active]:font-medium"
            >
              Risk
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-8 space-y-6">
            <PropertyOverview
              //   class={assetData.class}
              category={assetData.category}
              style={assetData.style}
              stage={assetData.stage}
              currency={assetData.currency}
              totalSfts={assetData.totalNumberOfSfts}
              pricePerSft={assetData.pricePerSft}
              basePropertyValue={assetData.basePropertyValue}
              totalPropertyValueAfterFees={
                assetData.totalPropertyValueAfterFees
              }
            />
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="mt-6">
            <FinancialDetails
              investmentPerformance={assetData.investmentPerformance}
              rentalInformation={assetData.rentalInformation}
              investorRequirementsAndTimeline={
                assetData.investorRequirementsAndTimeline
              }
              currency={assetData.currency}
            />
          </TabsContent>

          {/* Assets Tab */}
          <TabsContent value="assets" className="mt-8 space-y-8">
            <AmenitiesAndFeatures
              amenities={assetData.amenities || []}
              features={assetData.features || []}
            />
            <DocumentsAndTenants
              documents={assetData.documents || []}
              tenants={assetData.tenants || []}
              currency={assetData.currency}
            />
          </TabsContent>

          {/* Risk Tab */}
          <TabsContent value="risk" className="mt-6">
            <RiskAndAdditionalInfo
              riskFactors={assetData.riskFactors || []}
              riskDisclosures={assetData.riskDisclosures || []}
              additionalTaxes={assetData.additionalTaxes || []}
              faqs={assetData.faqs || []}
            />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
