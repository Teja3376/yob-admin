import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  blockchain: string | null;
  governanceModel: string | null;
  proposalThresholdPercent: number | null;
  quorumPercent: number | null;
  votingPeriod: VotingPeriod;
  decisionType: string | null;
  governanceRights: GovernanceRights;
};

type SpvDaoDetailsProps = {
  daoConfiguration: DaoConfiguration;
};

const SpvDaoDetails: React.FC<SpvDaoDetailsProps> = ({ daoConfiguration }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>DAO Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Blockchain Information */}
        <div>
          <h3 className="font-semibold mb-4">Blockchain Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Blockchain Name
              </p>
              <p className="font-medium">
                {daoConfiguration.blockchain || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Governance Mode
              </p>
              <p className="font-medium">
                {daoConfiguration.governanceModel || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Governance Parameters */}
        <div>
          <h3 className="font-semibold mb-4">Governance Parameters</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Proposal Threshold
              </p>
              <p className="font-medium">
                {daoConfiguration.proposalThresholdPercent
                  ? `${daoConfiguration.proposalThresholdPercent}%`
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Quorum</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">
                  {daoConfiguration.quorumPercent
                    ? `${daoConfiguration.quorumPercent}%`
                    : "N/A"}
                </p>
                {daoConfiguration.votingPeriod?.days && (
                  <>
                    <span className="text-muted-foreground">
                      {daoConfiguration.votingPeriod.days} Days
                    </span>
                    <span className="text-muted-foreground">
                      {daoConfiguration.votingPeriod.hours} Hours
                    </span>
                  </>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Decision Type
              </p>
              <div className="flex items-center gap-2">
                <p className="font-medium">
                  {daoConfiguration.decisionType || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Governance Rights */}
        <div>
          <h3 className="font-semibold mb-4">Governance Rights</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Voting Rights:</span>
              <Badge
                variant={
                  daoConfiguration.governanceRights.votingRights
                    ? "default"
                    : "outline"
                }
              >
                {daoConfiguration.governanceRights.votingRights
                  ? "Required"
                  : "Not Required"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Proposal Rights:
              </span>
              <Badge
                variant={
                  daoConfiguration.governanceRights.proposalCreation
                    ? "default"
                    : "outline"
                }
              >
                {daoConfiguration.governanceRights.proposalCreation
                  ? "Required"
                  : "Not Required"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Veto Power:</span>
              <p className="font-medium">
                {daoConfiguration.governanceRights.adminVotePower ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpvDaoDetails;
