import useIPFSUpload from "@/web3/ipfs/useipfsUpload";
import { deploySPV } from "@/web3/spv/deploySpv";
import { ethers } from "ethers";

export const useDeploySpv = () => {
  const { uploadSpvFiles } = useIPFSUpload();
  const handleDeploySpv = async (spv: any) => {
    const {
      _id,
      name,
      type,
      currency,
      jurisdiction,
      formationDate,
      businessPurpose,
      memoAndTerms,
      legalDocuments,
    } = spv;

    try {
      const metaDataCID = await uploadSpvFiles({
        name,
        spv_type: type,
        currency,
        jurisdiction,
        formation_date: formationDate,
        businessPurpose,
        investmentMemorandum: memoAndTerms?.investmentMemorandum || "",
        termsAndConditions: memoAndTerms?.termsAndConditions || "",
        riskFactors: memoAndTerms?.riskFactors || "",
        investmentStrategy: memoAndTerms?.investmentStrategy || "",
        legalDocuments: {
          articlesOfAssociation: {
            articlesOfAssociation_name:
              legalDocuments?.articlesOfAssociation?.name || "",
            articlesOfAssociation_url:
              legalDocuments?.articlesOfAssociation?.url || "",
          },
          llcOperatingAgreement: {
            llcOperatingAgreement_name:
              legalDocuments?.llcOperatingAgreement?.name || "",
            llcOperatingAgreement_url:
              legalDocuments?.llcOperatingAgreement?.url || "",
          },
          memorandumOfAssociation: {
            memorandumOfAssociation_name:
              legalDocuments?.memorandumOfAssociation?.name || "",
            memorandumOfAssociation_url:
              legalDocuments?.memorandumOfAssociation?.url || "",
          },
          otherDocuments: {
            otherDocuments_name: legalDocuments?.otherDocuments?.name || "",
            otherDocuments_url: legalDocuments?.otherDocuments?.url || "",
          },
        },
      });
      if (!metaDataCID) {
        throw new Error("Failed to upload SPV metadata to IPFS");
      }
      const metaCIDString = ethers.utils.formatBytes32String(
        metaDataCID.toString(),
      );
      const result = await deploySPV({
        spvId: _id,
        name,
        metaCID: metaCIDString,
      });
      console.log("SPV deployed successfully:", result);
      return result;
    } catch (error) {
      console.error("Error deploying SPV:", error);
    }
  };
  return { handleDeploySpv };
};
