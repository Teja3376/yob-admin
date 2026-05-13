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
import { useParams } from "next/navigation";
import useGetVehicleById from "../../hooks/vehicles/useGetVehicleById";
import Loading from "@/components/Loader";
import { toast } from "sonner";
import useApproveVehicle from "../../hooks/vehicles/useApproveVehicle";
import { useAuthStore1 } from "@/modules/adminauth/state/adminAuthStore";
import VehicleRejectApprovalDialog from "../components/VehicleDetail/VehicleRejectDialog";

const VehicleDetailPage = () => {
  const { vehicleId } = useParams();
  const { hasPermission } = useAuthStore1();

  const canDoAction = hasPermission("assets", "action");

  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isMintingFeeDialogOpen, setIsMintingFeeDialogOpen] = useState(false);
  const {
    data: vehicle,
    isFetching,
    isError,
    refetch,
  } = useGetVehicleById(vehicleId as string);

  const { mutate: approveVehicle, isPending: isApproving,isError:isApproveError,error:approveError } =
    useApproveVehicle();

  const isAlreadyApproved =
    (vehicle?.status || "").toLowerCase() === "approved" ||
    (vehicle?.status || "").toLowerCase() === "active";

  const handleConfirmApprove = async () => {
    // const result = await handleDeployAsset(assetData, setIsLoading);

    // const blockchain = {
    //   assetAddress: result?.asset || "",
    //   assetManagerAddress: result?.assetManager || "",
    //   orderManagerAddress: result?.orderManager || "",
    //   spvIdHash: result?.spvIdHash || "",
    //   assetIdHash: result?.assetIdHash || "",
    //   txHash: result?.txHash || "",
    // };

    const blockchain = {
      assetAddress: "0x123",
      assetManagerAddress: "0x456",
      orderManagerAddress: "0x789",
      spvIdHash: "0xabc",
      assetIdHash: "0xdef",
      txHash: "0xdef",
    };
    approveVehicle(
      { assetId: vehicleId as string, status: "approved", blockchain },
      {
        onSuccess: () => {
          setIsApproveDialogOpen(false);
          refetch();
        },
      },
    );
  };

  const handleReject = (reason: string) => {
    approveVehicle(
      {
        assetId: vehicleId as string,
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

  const handleRequestUpdate = () => {
    toast.info("Request update clicked");
  };

  const handleApproveClick = () => {
    toast.info("Approve clicked");
    setIsApproveDialogOpen(true);
  };

  if (isFetching) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <main className="min-h-screen ">
      <PageTitle title={"Detailed View of Asset"} suffix="Asset Details" />

      <div className="mx-auto">
        {/* Header Section */}
        <VehicleDetailHeader
          vehicle={vehicle}
          companyId={vehicle?.companyId}
          onRequestUpdate={handleRequestUpdate}
          onApprove={handleApproveClick}
          approveDisabled={isApproving}
          canApprove={canDoAction}
          isAlreadyApproved={isAlreadyApproved}
          onReject={() => setIsRejectDialogOpen(true)}
          setIsMintingFeeDialogOpen={setIsMintingFeeDialogOpen}
        />

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
          isLoading={isApproving}
          isError={isApproveError}
          errorMessage={approveError?.message}
        />

        <VehicleRejectApprovalDialog
          open={isRejectDialogOpen}
          setOpen={setIsRejectDialogOpen}
          onReject={(reason) => handleReject(reason)}
          isLoading={isApproving}
          isError={isApproveError}
          errorMessage={approveError?.message}
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
            {/* <TabsTrigger
              value="investments"
              className="data-[state=active]:bg-[#ffff] data-[state=active]:shadow-none data-[state=active]:text-primary  text-gray-500 text-base flex items-center gap-2 flex-1 min-w-0 py-2 m-0.5 transition-all duration-500 linear p-5 hover:bg-[#ffff] hover:text-black"
            >
              <p className="flex items-center gap-2">
                <TrendingUp size={24} />
                <span className="">Investments</span>
              </p>
            </TabsTrigger> */}
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
            <VehicleOverview vehicle={vehicle}/>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="mt-6">
            <VehicleFinancialDetails vehicle={vehicle} />
          </TabsContent>

          <TabsContent value="rental" className="mt-6">
            <VehicleRentalInformation vehicle={vehicle}/>
          </TabsContent>

          {/* <TabsContent value="investments" className="mt-8 space-y-8">
            <VehicleInvestmentDetails />
          </TabsContent> */}

          <TabsContent value="documents" className="mt-8 space-y-8">
            <VehicleDocumentDetails vehicle={vehicle} />

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
