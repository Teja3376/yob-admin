import { ethers, Contract, Wallet } from "ethers";
import factoryArtifact from "../ABIS/NexaSPVFactory.json";
import { Interface } from "ethers/lib/utils";

const FACTORY_INTERFACE = new Interface(factoryArtifact.abi);

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_SPV_FACTORY_ADDRESS;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_CALLER_PRIVATE_KEY;

if (!RPC_URL) throw new Error("NEXT_PUBLIC_RPC_URL is not defined");
if (!FACTORY_ADDRESS)
  throw new Error("NEXT_PUBLIC_SPV_FACTORY_ADDRESS is not defined");
if (!PRIVATE_KEY)
  throw new Error("NEXT_PUBLIC_CALLER_PRIVATE_KEY is not defined");

const rpcUrl: string = RPC_URL;
const factoryAddress: string = FACTORY_ADDRESS;
const privateKey: string = PRIVATE_KEY;

interface DeploySPVParams {
  spvId: string;
  name: string;
  metaCID: string;
}

interface DeploySPVResult {
  txHash: string;
  blockNumber: number;
  spvAddress?: string;
  idHash?: string;
  spvId?: string;
}

function normaliseMetaCID(metaCID: string): string {
  const hex = metaCID.startsWith("0x") ? metaCID.slice(2) : metaCID;
  if (hex.length !== 64) {
    throw new Error("metaCID must be 32 bytes (64 hex characters)");
  }
  return "0x" + hex;
}

export async function deploySPV({
  spvId,
  name,
  metaCID,
}: DeploySPVParams): Promise<DeploySPVResult> {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const signer = new Wallet(privateKey, provider);
  const factory = new Contract(factoryAddress, FACTORY_INTERFACE, signer);

  if (!spvId || spvId.length > 256)
    throw new Error("spvId must be 1–256 bytes");
  if (!name || name.length > 256) throw new Error("name must be 1–256 bytes");

  const metaCIDBytes32 = normaliseMetaCID(metaCID);

  const isPaused: boolean = await factory.paused();
  if (isPaused) throw new Error("Factory contract is currently paused");


  let gasEstimate: ethers.BigNumber;
  try {
    gasEstimate = await factory.estimateGas.deploySPV(
      spvId,
      name,
      metaCIDBytes32
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(
      "Gas estimation failed — check caller permissions and inputs:",
      message
    );
    throw err;
  }

  const gasLimit = gasEstimate.mul(120).div(100); 



const maxPriorityFeePerGas = ethers.utils.parseUnits("30", "gwei");
const maxFeePerGas = ethers.utils.parseUnits("80", "gwei");



  const tx = await factory.deploySPV(spvId, name, metaCIDBytes32, {
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  });

  console.log("Transaction Hash:", tx.hash);

  const receipt = await tx.wait(1);


  let deployedSPV: Omit<DeploySPVResult, "txHash" | "blockNumber"> | null = null;

  for (const log of receipt.logs) {
    try {
      const parsed = factory.interface.parseLog(log);
      if (parsed?.name === "SPVSuiteDeployed") {
        const { idHash, spv, spvId: deployedSpvId } = parsed.args;
        deployedSPV = {
          spvAddress: spv,
          idHash,
          spvId: deployedSpvId,
        };

        console.log("\nSPV Deployed Successfully!");
        console.log("  SPV Address :", spv);

        break;
      }
    } catch {
      
    }
  }

  return {
    txHash: receipt.transactionHash,
    blockNumber: receipt.blockNumber,
    ...deployedSPV,
  };
}