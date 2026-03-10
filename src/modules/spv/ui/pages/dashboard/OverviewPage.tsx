"use client";
import Loading from "@/components/Loader";
import { useGetOverview } from "@/modules/spv/hooks/dashboard/useGetOverview";
import { useParams } from "next/navigation";
import TokenInfo from "../../components/overview/TokenInfo";
import Investment from "../../components/overview/Investment";
import PropertyValue from "../../components/overview/PropertyValue";
import Investors from "../../components/overview/Investors";
import KeyPerformance from "../../components/overview/KeyPerformance";
import AssetHostedBy from "../../components/overview/AssetHostedBy";
import Dao from "../../components/overview/Dao";
import PropertyDetails from "../../components/overview/PropertyDetails";

const OverviewPage = () => {
  const { spvId } = useParams<{ spvId: string }>();
  const {
    data: details,
    isFetching,
    isError,
    error,
  } = useGetOverview(spvId as string);
  const assetData = details?.asset;
  const spvData = details?.spv;
  const fundingData = details?.funding;

  if (isFetching && !details) {
    return <Loading message="Getting ..." />;
  }
  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="mt-5">
      <div className="grid grid-cols-5 gap-3 items-stretch">
        <div className="col-span-3 space-y-3">
          <PropertyDetails
            name={assetData?.name}
            about={assetData?.about}
            location={assetData?.location}
            spvName={spvData?.name}
            spvAbout={spvData?.about}
            spvCreation={spvData?.creationDate}
          />
          <TokenInfo
            tokenPrice={assetData?.tokenInformation?.tokenPrice}
            tokenSymbol={assetData?.tokenInformation?.tokenSymbol}
            availableTokens={assetData?.tokenInformation?.availableTokensToBuy}
            totalTokens={assetData?.tokenInformation?.tokenSupply}
            currency={assetData?.currency}
          />
        </div>
        <div className="col-span-2 space-y-2">
          <Investment
            totalRaised={fundingData?.totalRaised}
            fundingTarget={fundingData?.fundingTarget}
            currency={assetData?.currency}
            fundingProgress={fundingData?.fundingProgress}
          />
          <PropertyValue
            currentValue={assetData?.propertyValue?.latestPropertyValue}
            appreciation={assetData?.propertyValue?.appreciation}
            currency={assetData?.currency}
          />
          <Investors
            totalInvestors={fundingData?.investorCount}
            avgInvestment={fundingData?.averageInvestorAmount}
            annualRentalYield={assetData?.grossRentalYield}
            currency={assetData?.currency}
          />
          <KeyPerformance
            irr={assetData?.irr}
            occupancy={assetData?.vacancyRate}
            grossMonthlyRentalIncome={assetData?.grossMonthlyRent}
            netMonthlyRentalIncome={assetData?.netMonthlyRent}
            currency={assetData?.currency}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
