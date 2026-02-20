/** @format */

import { useState } from 'react';
import { PinataFileManager } from './ipfs';
import { toast } from 'sonner';


interface SpvMetadata {
  name: string;
  spv_type: string;
  currency: string;
  jurisdiction: string;
  formation_date: string;
  businessPurpose: string;
  investmentMemorandum: string;
  termsAndConditions: string;
  riskFactors: string;
  investmentStrategy: string;
  legalDocuments:{
    articlesOfAssociation:{
      articlesOfAssociation_name: string;
      articlesOfAssociation_url: string;
    },
    llcOperatingAgreement:{
      llcOperatingAgreement_name: string;
      llcOperatingAgreement_url: string;
    },
    memorandumOfAssociation:{
        memorandumOfAssociation_name: string;
        memorandumOfAssociation_url: string;
    },
    otherDocuments:{
      otherDocuments_name?: string;
      otherDocuments_url?: string;
    }

  }
}

interface AssetMetadata {
  name: string;
  assetStyle: string;
  currency: string;
  instrumentType: string;
  description: string;
  companyName: string;
  tokenInformation: {
    tokenSupply: number;
    tokenSymbol: string;
    minimumTokensToBuy: number;
    maximumTokensToBuy: number;
    availableTokensToBuy: number;
    tokenPrice?: number;
  };
  // documents:[
  //   document:{
  //     document_name:string,
  //     document_url:string,
  //   }
  // ]



}

const useIPFSUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pinataManager = new PinataFileManager();

  const uploadSpvFiles = async (
    metadata: SpvMetadata
  ): Promise<{ [key: string]: string }> => {
    setLoading(true);
    setError(null);
    const fileUrls: { [key: string]: string } = {};

    try {
      // Upload spa metadata to IPFS
      const metadataCID = await pinataManager.uploadJSON(metadata, 'public', {
        name: `${metadata.name}-metadata`,
        keyvalues: {
          type: 'spa_metadata',
          company_name: metadata.name,
        },
      });
      console.log('Metadata uploaded to IPFS:', metadataCID);

      fileUrls['metadata'] = metadataCID; 

      return fileUrls;
    } catch (err: any) {
      const errorMessage =
        err.message || 'An error occurred while uploading metadata to IPFS';
      toast.error(errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const uploadProjectFiles = async (
    metadata: AssetMetadata
  ): Promise<{ [key: string]: string }> => {
    setLoading(true);
    setError(null);
    const fileUrls: { [key: string]: string } = {};

    try {
      // Upload company metadata to IPFS
      const metadataCID = await pinataManager.uploadJSON(metadata, 'public', {
        name: `${metadata.name}-metadata`,
        keyvalues: {
          type: 'project_metadata',
          project_name: metadata.name,
        },
      });
      console.log('Metadata uploaded to IPFS in uploadProjectFiles: ', metadataCID);


      // Return the metadata CID (no file uploads)
      fileUrls['metadata'] = metadataCID; // Store metadata CID instead of file URLs

      return fileUrls;
    } catch (err: any) {
      const errorMessage =
        err.message || 'An error occurred while uploading metadata to IPFS';
      toast.error(errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  


  return { uploadSpvFiles, uploadProjectFiles, loading, error };
};

export default useIPFSUpload;


