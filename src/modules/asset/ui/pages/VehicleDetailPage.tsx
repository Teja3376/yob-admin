"use client";
import PageTitle from "@/components/PageTitle";
import { VehicleDetailHeader } from "../components/VehicleDetail/VehicleDetailHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  DollarSign,
  FileText,
  Lock,
  LockIcon,
  TrendingUp,
  Users,
} from "lucide-react";
import { VehicleOverview } from "../components/VehicleDetail/VehicleOverview";
import { useState } from "react";
import { VehicleFinancialDetails } from "../components/VehicleDetail/VehicleFinancialDetails";
import { VehicleRentalInformation } from "../components/VehicleDetail/VehicleRentalInformation";
import VehicleDocumentDetails from "../components/VehicleDetail/VehicleDocumentDetails";
import { VehicleInvestmentDetails } from "../components/VehicleDetail/VehicleInvestmentDetails";
import { VehicleApprovalDialog } from "../components/VehicleDetail/VehicleApprovalDialog";
import { VehicleMintingFeeBanner } from "../components/VehicleDetail/VehicleMintingFeeBanner";

const VehicleDetailPage = () => {
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isMintingFeeDialogOpen, setIsMintingFeeDialogOpen] = useState(false);

  const handleConfirmApprove = async () => {
    // approveAsset(
    //   { assetId: assetId as string, status: "approved", blockchain },
    //   {
    //     onSuccess: () => {
    //       setIsApproveDialogOpen(false);
    //       refetch();
    //     },
    //   },
    // );
  };
  return (
    <main className="min-h-screen ">
      <PageTitle title={"Detailed View of Asset"} suffix="Asset Details" />

      <div className="mx-auto">
        {/* Header Section */}
        <VehicleDetailHeader />

        <VehicleMintingFeeBanner
          onRequestClick={() => setIsMintingFeeDialogOpen(true)}
        />

        {/* {assetData.status === "rejected" && (
          <VehicleStatus
            status={
              assetData.status as "pending" | "approved" | "active" | "rejected" 
            }
            reason={assetData.rejectionReason}
            date={assetData.updatedAt}
          />
        )}         */}

        <VehicleApprovalDialog
          open={isApproveDialogOpen}
          onOpenChange={setIsApproveDialogOpen}
          onConfirmApprove={handleConfirmApprove}
          // isLoading={isApproving || loading}
          // isError={isApproveError}
          // errorMessage={approveError?.message}
        />

        <Tabs defaultValue="overview" className="mt-8">
          <TabsList
            className={`${isTabsSticky ? "sticky top-20 z-40 shadow-xl" : "relative"} inline-flex md:h-12 items-center justify-center text-muted-foreground w-full scrollbar-hidden backdrop-blur-lg bg-gray-100 mb-2 p-1 rounded-lg h-16`}
          >
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#ffff] data-[state=active]:shadow-none data-[state=active]:text-primary  text-gray-500 text-base flex items-center gap-2 flex-1 min-w-0 py-2 m-0.5 transition-all duration-500 linear p-5 hover:bg-[#ffff] hover:text-black"
            >
              <p className="flex items-center gap-2">
                <Building2 size={24} />
                <span className="">Overview</span>
              </p>
            </TabsTrigger>

            <TabsTrigger
              value="financial"
              className="data-[state=active]:bg-[#ffff] data-[state=active]:shadow-none data-[state=active]:text-primary  text-gray-500 text-base flex items-center gap-2 flex-1 min-w-0 py-2 m-0.5 transition-all duration-500 linear p-5 hover:bg-[#ffff] hover:text-black"
            >
              <p className="flex items-center gap-2">
                <DollarSign size={24} />
                <span className="">Financials</span>
              </p>
            </TabsTrigger>

            <TabsTrigger
              value="rental"
              className="data-[state=active]:bg-[#ffff] data-[state=active]:shadow-none data-[state=active]:text-primary  text-gray-500 text-base flex items-center gap-2 flex-1 min-w-0 py-2 m-0.5 transition-all duration-500 linear p-5 hover:bg-[#ffff] hover:text-black"
            >
              <p className="flex items-center gap-2">
                <LockIcon size={24} />
                <span className="">Rental Information</span>
              </p>
            </TabsTrigger>
            <TabsTrigger
              value="investments"
              className="data-[state=active]:bg-[#ffff] data-[state=active]:shadow-none data-[state=active]:text-primary  text-gray-500 text-base flex items-center gap-2 flex-1 min-w-0 py-2 m-0.5 transition-all duration-500 linear p-5 hover:bg-[#ffff] hover:text-black"
            >
              <p className="flex items-center gap-2">
                <TrendingUp size={24} />
                <span className="">Investments</span>
              </p>
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-[#ffff] data-[state=active]:shadow-none data-[state=active]:text-primary  text-gray-500 text-base flex items-center gap-2 flex-1 min-w-0 py-2 m-0.5 transition-all duration-500 linear p-5 hover:bg-[#ffff] hover:text-black"
            >
              <p className="flex items-center gap-2">
                <FileText size={24} />
                <span className="">Documents</span>
              </p>
            </TabsTrigger>
            {/* <TabsTrigger
              value="risk"
              className="data-[state=active]:bg-[#ffff] data-[state=active]:shadow-none data-[state=active]:text-primary  text-gray-500 text-base flex items-center gap-2 flex-1 min-w-0 py-2 m-0.5 transition-all duration-500 linear p-5 hover:bg-[#ffff] hover:text-black"
            >
              <p className="flex items-center gap-2">
                <Building2 size={24} />
                <span className="">Risk</span>
              </p>
            </TabsTrigger> */}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-8 space-y-6">
            <VehicleOverview />
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="mt-6">
            <VehicleFinancialDetails />
          </TabsContent>

          <TabsContent value="rental" className="mt-6">
            <VehicleRentalInformation />
          </TabsContent>

          <TabsContent value="investments" className="mt-8 space-y-8">
            <VehicleInvestmentDetails />
          </TabsContent>

          <TabsContent value="documents" className="mt-8 space-y-8">
            <VehicleDocumentDetails />

            {/* <DocumentDetails
              data={{
                legalAdivisory: assetData.legalAdivisory,
                assetManagementCompany: assetData.assetManagementCompany,
                brokerage: assetData.brokerage,
                documents: assetData.documents,
              }}
            /> */}
          </TabsContent>

          <TabsContent value="risk" className="mt-6">
            {/* <RiskAndAdditionalInfo
              riskFactors={assetData.riskFactors || []}
              riskDisclosures={assetData.riskDisclosures || []}
              additionalTaxes={assetData.additionalTaxes || []}
              faqs={assetData.faqs || []}
            /> */}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default VehicleDetailPage;
