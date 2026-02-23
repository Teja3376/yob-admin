import { ethers, Contract, Wallet } from "ethers";
import factoryArtifact from "../ABIS/NexaAssetFactory.json";
import { Interface } from "ethers/lib/utils";

const FACTORY_INTERFACE = new Interface(factoryArtifact.abi);

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_ASSET_FACTORY_ADDRESS;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_CALLER_PRIVATE_KEY;

if (!RPC_URL) throw new Error("NEXT_PUBLIC_RPC_URL is not defined");
if (!FACTORY_ADDRESS)
  throw new Error("NEXT_PUBLIC_ASSET_FACTORY_ADDRESS is not defined");
if (!PRIVATE_KEY)
  throw new Error("NEXT_PUBLIC_CALLER_PRIVATE_KEY is not defined");

const rpcUrl: string = RPC_URL;
const factoryAddress: string = FACTORY_ADDRESS;
const privateKey: string = PRIVATE_KEY;



export interface DeployAssetParams {
  spvId: string;
  assetId: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: ethers.BigNumberish;
  metaCID: string; 
  spv: string;
  assetOwner: string;
  lockUpDuration: ethers.BigNumberish;
  tokenPrice: ethers.BigNumberish;
}

export interface DeployAssetResult {
  txHash: string;
  blockNumber: number;
  asset?: string;
  assetManager?: string;
  orderManager?: string;
  spvIdHash?: string;
  assetIdHash?: string;
}



function normaliseMetaCID(metaCID: string): string {
  const hex = metaCID.startsWith("0x") ? metaCID.slice(2) : metaCID;
  if (hex.length !== 64) {
    throw new Error("metaCID must be 32 bytes (64 hex characters)");
  }
  return "0x" + hex;
}



export async function deployAsset(
  params: DeployAssetParams
): Promise<DeployAssetResult> {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const signer = new Wallet(privateKey, provider);
  const factory = new Contract(factoryAddress, FACTORY_INTERFACE, signer);

  const {
    spvId,
    assetId,
    name,
    symbol,
    decimals,
    totalSupply,
    metaCID,
    spv,
    assetOwner,
    lockUpDuration,
    tokenPrice,
  } = params;

  console.log("Preparing to deploy asset with the following parameters:",params);


  if (!spvId || spvId.length > 256) throw new Error("spvId must be 1–256 bytes");
  if (!assetId || assetId.length > 256) throw new Error("assetId must be 1–256 bytes");
  if (!name || name.length > 256) throw new Error("name must be 1–256 bytes");
  if (!symbol || symbol.length > 256) throw new Error("symbol must be 1–256 bytes");

  if (!ethers.utils.isAddress(spv)) throw new Error("Invalid SPV address");
  if (!ethers.utils.isAddress(assetOwner)) throw new Error("Invalid assetOwner address");

  const metaCIDBytes32 = normaliseMetaCID(metaCID);

  const isPaused: boolean = await factory.paused();
  if (isPaused) throw new Error("Asset factory contract is currently paused");


  let gasEstimate: ethers.BigNumber;
  try {
    gasEstimate = await factory.estimateGas.deployAsset({
      spvId,
      assetId,
      name,
      symbol,
      decimals,
      totalSupply,
      metaCID: metaCIDBytes32,
      spv,
      assetOwner,
      lockUpDuration,
      tokenPrice,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Gas estimation failed — check caller permissions and inputs:", message);
    throw err;
  }

  const gasLimit = gasEstimate.mul(120).div(100);

 
  const maxPriorityFeePerGas = ethers.utils.parseUnits("30", "gwei");
  const maxFeePerGas = ethers.utils.parseUnits("80", "gwei");

  console.log("Deploying Asset...");
  console.log("  spvId       :", spvId);
  console.log("  assetId     :", assetId);
  console.log("  name        :", name);
  console.log("  symbol      :", symbol);
  console.log("  decimals    :", decimals);
  console.log("  totalSupply :", totalSupply.toString());
  console.log("  metaCID     :", metaCIDBytes32);
  console.log("  spv         :", spv);
  console.log("  assetOwner  :", assetOwner);
  console.log("  gasLimit    :", gasLimit.toString());


  const tx = await factory.deployAsset(
    {
      spvId,
      assetId,
      name,
      symbol,
      decimals,
      totalSupply,
      metaCID: metaCIDBytes32,
      spv,
      assetOwner,
      lockUpDuration,
      tokenPrice,
    },
    {
      gasLimit,
      maxFeePerGas,
      maxPriorityFeePerGas,
    }
  );

  console.log("Transaction sent:", tx.hash);

  const receipt = await tx.wait(1);
  console.log("Transaction mined in block:", receipt.blockNumber);


  let deployed: Omit<DeployAssetResult, "txHash" | "blockNumber"> | null = null;

  for (const log of receipt.logs) {
    try {
      const parsed = factory.interface.parseLog(log);
      if (parsed?.name === "AssetSuiteDeployed") {
        const { spvIdHash, assetId, asset, assetManager, orderManager } = parsed.args;

        deployed = {
          asset,
          assetManager,
          orderManager,
          spvIdHash,
          assetIdHash: assetId,
        };

        console.log("\nAsset Deployed Successfully!");
        console.log("  Asset         :", asset);
        console.log("  Asset Manager :", assetManager);
        console.log("  Order Manager :", orderManager);
        break;
      }
    } catch (err) {
      console.error("Non-matching log, skipping...", err);
      throw err;

    }
  }

  return {
    txHash: receipt.transactionHash,
    blockNumber: receipt.blockNumber,
    ...deployed,
  };
}