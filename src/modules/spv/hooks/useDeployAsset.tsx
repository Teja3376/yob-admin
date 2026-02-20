import useIPFSUpload from "@/web3/ipfs/useipfsUpload"
import {deployAsset} from "@/web3/asset/deployAsset";
import { ethers } from "ethers";

export const useDeployAsset = () => {
    const {uploadProjectFiles} = useIPFSUpload();

}