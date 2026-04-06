"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetDetailHeader } from "../components/AssetDetail/AssetdetailHeader";
import { PropertyOverview } from "../components/AssetDetail/Propertyoverview";
import { FinancialDetails } from "../components/AssetDetail/FinancialDetails";
// import { AmenitiesAndFeatures } from '../components/AssetDetail/AmenitiesAndFeatures';
import { DocumentsAndTenants } from "../components/AssetDetail/DocumentsAndTenants";
import { RiskAndAdditionalInfo } from "../components/AssetDetail/RiskAndAdditionalInfo";
import { AmenitiesAndFeatures } from "../components/AssetDetail/AmenitiesAndFeatures";
import { Building2, DollarSign, FileText, LoaderCircle, TrendingUp, User2, User2Icon, Users } from "lucide-react";
import AssetApprovalDialog from "../components/AssetApprovalDialog";
import { toast } from "sonner";
import Loading from "@/components/Loader";
import useGetAssetById from "../../hooks/useGetAssetByID";
import { useDeployAsset } from "../../hooks/useDeployAsset";
import useApproveAsset from "../../hooks/useApproveAsset";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";
import PageTitle from "@/components/PageTitle";
import RejectApprovalDialog from "../components/RejectionDialog";
import AssetStatus from "../components/AssetDetail/AssetStatus";
import ErrorPage from "@/components/Error";
import Document from "next/document";
import TenantsSection from "../components/AssetDetail/TenentsDetails";
import Investment from "@/modules/spv/ui/components/overview/Investment";
import InvestmentDetails from "../components/AssetDetail/InvestmentDetails";
import DocumentDetails from "../components/AssetDetail/DocumentDetails";

export default function AssetDetailPage() {
  const { assetId } = useParams();
  const { hasPermission } = useAuthStore1();
  const canDoAction = hasPermission("assets", "action");
  const {
    data: assetData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAssetById(assetId as string);

  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isTabsSticky, setIsTabsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsTabsSticky(window.scrollY > 260);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { handleDeployAsset } = useDeployAsset();
  const {
    mutate: approveAsset,
    isPending: isApproving,
    isError: isApproveError,
    error: approveError,
  } = useApproveAsset();
  const [loading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-20">
        <Loading message="Loading Asset details..." />{" "}
      </div>
    );
  }

  if (isError && !assetData) {
    return (
      // <div className="flex items-center justify-center mt-20 min-h-screen">
      //   <p className="text-red-500">
      //     Error loading Asset details: {error?.message || "Asset not found"}
      //   </p>
      // </div>
      <ErrorPage
        title="Error Gathering Asset Details"
        errorMessage={error?.message || "Unknown error occurred while fetching asset details."}
      />
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
    const result = await handleDeployAsset(assetData, setIsLoading);

    const blockchain = {
      assetAddress: result?.asset || "",
      assetManagerAddress: result?.assetManager || "",
      orderManagerAddress: result?.orderManager || "",
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

  const handleReject = (reason: string) => {
    approveAsset(
      {
        assetId: assetId as string,
        status: "rejected",
        rejectionReason: reason,
      },
      {
        onSuccess: () => {
          setIsRejectDialogOpen(false);
          toast.success("Asset rejected successfully");
          refetch();
        },
        onError: () => {
          toast.error("Failed to reject Asset");
        },
      },
    );
  };

  return (
    <main className="min-h-screen ">
      <PageTitle
        title={assetData?.name || "Detailed View of Asset"}
        suffix="Asset Details"
      />

      <div className="mx-auto">
        {/* Header Section */}
        <AssetDetailHeader
          name={assetData.name}
          companyId={assetData.company._id}
          assetId={assetId as string}
          location={location}
          status={
            assetData.status as "pending" | "approved" | "active" | "rejected"
          }
          images={[
    ...(assetData.media?.imageURL ? [assetData.media.imageURL] : []),
    ...(assetData.media?.gallery || [])
  ]}
          stage={assetData.stage}
          onRequestUpdate={handleRequestUpdate}
          onApprove={handleApproveClick}
          approveDisabled={isApproving}
          canApprove={canDoAction}
          isAlreadyApproved={isAlreadyApproved}
          onReject={() => setIsRejectDialogOpen(true)}
        />
        {assetData.status !== "pending" && (
          <AssetStatus
            status={
              assetData.status as "pending" | "approved" | "active" | "rejected" 
            }
            reason={assetData.rejectionReason}
            date={assetData.updatedAt}
          />
        )}

        <AssetApprovalDialog
          open={isApproveDialogOpen}
          onOpenChange={setIsApproveDialogOpen}
          onConfirmApprove={handleConfirmApprove}
          isLoading={isApproving || loading}
          isError={isApproveError}
          errorMessage={approveError?.message}
        />

        {/* Tabs for Different Sections */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className={`${isTabsSticky ? "sticky top-20 z-40 shadow-xl" : "relative"} inline-flex md:h-12 items-center justify-center text-muted-foreground w-full scrollbar-hidden backdrop-blur-lg bg-gray-100 mb-2 p-1 rounded-lg h-16`}>

            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#ffff] data-[state=active]:shadow-none data-[state=active]:text-primary  text-gray-500 text-base flex items-center gap-2 flex-1 min-w-0 py-2 m-0.5 transition-all duration-500 linear p-5 hover:bg-[#ffff] hover:text-black"
            >
             <p className="flex items-center gap-2">
                  <Building2 size={24} />
                  <span className="">
                    Overview
                  </span>
                </p>
            </TabsTrigger>

            <TabsTrigger
              value="financial"
              className="data-[state=active]:bg-[#ffff] data-[state=active]:shadow-none data-[state=active]:text-primary  text-gray-500 text-base flex items-center gap-2 flex-1 min-w-0 py-2 m-0.5 transition-all duration-500 linear p-5 hover:bg-[#ffff] hover:text-black"
            >
             <p className="flex items-center gap-2">
                  <DollarSign size={24} />
                  <span className="">
                   Financials
                  </span>
                </p>
            </TabsTrigger>
            <TabsTrigger
              value="tenants"
              className="data-[state=active]:bg-[#ffff] data-[state=active]:shadow-none data-[state=active]:text-primary  text-gray-500 text-base flex items-center gap-2 flex-1 min-w-0 py-2 m-0.5 transition-all duration-500 linear p-5 hover:bg-[#ffff] hover:text-black"
            >
             <p className="flex items-center gap-2">
                  <Users size={24} />
                  <span className="">
                   Tenants
                  </span>
                </p>
            </TabsTrigger>
            <TabsTrigger
              value="investments"
              className="data-[state=active]:bg-[#ffff] data-[state=active]:shadow-none data-[state=active]:text-primary  text-gray-500 text-base flex items-center gap-2 flex-1 min-w-0 py-2 m-0.5 transition-all duration-500 linear p-5 hover:bg-[#ffff] hover:text-black"
            >
             <p className="flex items-center gap-2">
                  <TrendingUp size={24} />
                  <span className="">
                    Investments
                  </span>
                </p>
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-[#ffff] data-[state=active]:shadow-none data-[state=active]:text-primary  text-gray-500 text-base flex items-center gap-2 flex-1 min-w-0 py-2 m-0.5 transition-all duration-500 linear p-5 hover:bg-[#ffff] hover:text-black"
            >
             <p className="flex items-center gap-2">
                  <FileText size={24} />
                  <span className="">
                    Documents
                  </span>
                </p>
            </TabsTrigger>
           <TabsTrigger
              value="risk"
              className="data-[state=active]:bg-[#ffff] data-[state=active]:shadow-none data-[state=active]:text-primary  text-gray-500 text-base flex items-center gap-2 flex-1 min-w-0 py-2 m-0.5 transition-all duration-500 linear p-5 hover:bg-[#ffff] hover:text-black"
            >
             <p className="flex items-center gap-2">
                  <Building2 size={24} />
                  <span className="">
                    Risk
                  </span>
                </p>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-8 space-y-6">
            <PropertyOverview
              //   class={assetData.class}
              companyName={assetData.company.name}
              jurisdiction={assetData.company.jurisdiction}
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
              description={assetData.description}
              issuerName={assetData.company.name}
              projectsCount={assetData.company.projectsCount}
              estimatedReturnsAsPerLockInPeriod={assetData.investmentPerformance.estimatedReturnsAsPerLockInPeriod}

            />
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="mt-6">
            <FinancialDetails
              investmentPerformance={assetData.investmentPerformance}
              rentalInformation={assetData.rentalInformation}
              currency={assetData.currency}
              data={assetData}
            />
          </TabsContent>

          {/* Assets Tab */}
          <TabsContent value="tenants" className="mt-8 space-y-8">

            <TenantsSection
              tenants={assetData.tenants || []}
            />
          </TabsContent>

          <TabsContent value="investments" className="mt-8 space-y-8">
            <InvestmentDetails
              data={{
                tokenInformation: assetData.tokenInformation,
                blockchain: assetData.blockchain,
              }}
            />
          </TabsContent>

          <TabsContent value="documents" className="mt-8 space-y-8">

            <DocumentDetails
              data={{
                legalAdivisory: assetData.legalAdivisory,
                assetManagementCompany: assetData.assetManagementCompany,
                brokerage: assetData.brokerage,
                documents: assetData.documents,
              }}
            />
          </TabsContent>

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

      <RejectApprovalDialog
        open={isRejectDialogOpen}
        setOpen={setIsRejectDialogOpen}
        onReject={(reason) => handleReject(reason)}
        isLoading={isApproving}
         isError={isApproveError}
          errorMessage={approveError?.message}
      />
    </main>
  );
}
