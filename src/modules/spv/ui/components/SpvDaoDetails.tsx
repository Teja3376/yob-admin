import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartBarIncreasing,
  ExternalLink,
  Link,
  Shield,
  ShieldAlertIcon,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type VotingPeriod = {
  days: number | null;
  hours: number | null;
};

type GovernanceRights = {
  votingRights: boolean;
  proposalCreation: boolean;
  adminVotePower: boolean;
};

type DaoConfiguration = {
  spvAddress: string;
  orderManagerAddress: string | null;
  txHash: string;
  governanceModel: string | null;
  proposalThresholdPercent: number | null;
  quorumPercent: number | null;
  votingPeriod: VotingPeriod;
  decisionType: string | null;
  governanceRights: GovernanceRights;
};

type SpvDaoDetailsProps = {
  blockchain: DaoConfiguration;
};

const SpvDaoDetails: React.FC<SpvDaoDetailsProps> = ({ blockchain }) => {
  const openOnExplorer = (
    value?: string,
    type: "address" | "tx" = "address",
  ) => {
    if (!value) return;

    const base = "https://amoy.polygonscan.com/";

    const url =
      type === "tx" ? `${base}/tx/${value}` : `${base}/address/${value}`;

    window.open(url, "_blank");
  };
  return (
    <Card className="rounded-2xl shadow-sm">
      <div className="flex items-center gap-3 mb-3 ml-6">
        <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
          <Link size={20} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Blockchain</h2>
      </div>
      <CardContent className="space-y-4 ">
        <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase">SPV Address</p>

            <p className="text-xs text-orange-600 break-all">
              {blockchain?.spvAddress
                ? `${blockchain.spvAddress.slice(0, 6)}...${blockchain.spvAddress.slice(-4)}`
                : "N/A"}
            </p>
          </div>

          <Button
            className="text-gray-500 hover:text-black bg-gray-100 hover:bg-gray-100"
            onClick={() => openOnExplorer(blockchain?.spvAddress)}
          >
            <ExternalLink size={16} />
          </Button>
        </div>

        <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase">Transaction Hash</p>

            <p className="text-xs text-orange-600 break-all truncate">
              {blockchain?.txHash
                ? `${blockchain.txHash.slice(0, 6)}...${blockchain.txHash.slice(-4)}`
                : "N/A"}
            </p>
          </div>

          <Button
            className="text-gray-500 hover:text-black bg-gray-100 hover:bg-gray-100 "
            onClick={() => openOnExplorer(blockchain?.txHash, "tx")}
          >
            <ExternalLink size={16} />
          </Button>
        </div>

        <div className="flex gap-2">
          <ShieldCheck size={20} className="text-green-400 mb-2" />
          <p className="text-gray-500 text-sm uppercase">
            Verified on Polygon Testnet
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpvDaoDetails;
