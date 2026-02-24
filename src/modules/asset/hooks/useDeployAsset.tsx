import useIPFSUpload from "@/web3/ipfs/useipfsUpload";
import { deployAsset } from "@/web3/asset/deployAsset";
import { ethers } from "ethers";
import { set } from "date-fns";

export const useDeployAsset = () => {
  const { uploadProjectFiles } = useIPFSUpload();
  const handleDeployAsset = async (
    asset: any,
    setIsLoading: (loading: boolean) => void,
  ) => {
    console.log("Deploying asset with data:", asset);
    setIsLoading(true);
    const {
      spvId,
      _id,
      name,
      style,
      currency,
      about,
      company,
      tokenInformation,
      legalAdivisory,
      assetManagementCompany,
      brokerage,
      investorRequirementsAndTimeline,
    } = asset;
    console.log("Extracted asset details:", {
      spvId,
      _id,
      name,
      style,
      currency,
      about,
      company,
      tokenInformation,
      legalAdivisory,
      assetManagementCompany,
      brokerage,
      investorRequirementsAndTimeline,
    });
    try {
      const metaDataCID = await uploadProjectFiles({
        spvId,
        assetId: _id,
        name,
        assetStyle: style,
        currency,
        description: about,
        companyName: company?.name,
        tokenInformation: {
          tokenSupply: tokenInformation?.tokenSupply,
          tokenSymbol: tokenInformation?.tokenSymbol,
          minimumTokensToBuy: tokenInformation?.minimumTokensToBuy,
          maximumTokensToBuy: tokenInformation?.maximumTokensToBuy,
          availableTokensToBuy: tokenInformation?.availableTokensToBuy,
          tokenPrice: tokenInformation?.tokenPrice,
        },
        documents: {
          legalAdvisory: {
            name: legalAdivisory?.name,
            doc_name: legalAdivisory?.document?.name,
            url: legalAdivisory?.document?.url,
          },
          assetManagementCompany: {
            name: assetManagementCompany?.name,
            doc_name: assetManagementCompany?.document?.name,
            url: assetManagementCompany?.document?.url,
          },
          brokerage: {
            name: brokerage?.name,
            doc_name: brokerage?.document?.name,
            url: brokerage?.document?.url,
          },
        },
      });
      console.log("Metadata uploaded to IPFS with CID:", metaDataCID);
      if (!metaDataCID) {
        throw new Error("Failed to upload SPV metadata to IPFS");
      }
      const metaCIDString = ethers.utils.formatBytes32String(
        metaDataCID.toString(),
      );
      const formattedTotalSupply =
        tokenInformation?.tokenSupply?.toString() || "0";
      const result = await deployAsset({
        spvId,
        assetId: _id,
        name,
        symbol: tokenInformation?.tokenSymbol || "",
        decimals: 18,
        totalSupply: ethers.utils.parseEther(formattedTotalSupply),
        metaCID: metaCIDString,
        spv: company?.blockchain?.spvAddress,
        assetOwner: "0x4C8bDd3A27575279f8d7e498e71d570f2e476Fd2",
        lockUpDuration: investorRequirementsAndTimeline?.lockupPeriod,
        tokenPrice: tokenInformation?.tokenPrice,
      });
      return result;
    } catch (error) {
      console.error("Error deploying Asset:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return { handleDeployAsset };
};
