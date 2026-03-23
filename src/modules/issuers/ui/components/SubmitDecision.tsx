import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CircleAlert, LoaderCircle, XCircle } from "lucide-react";
import { useState } from "react";
import App from "next/app";
import ApproveDialog from "./ApproveDialog";
import RejectApprovalDialog from "./RejectApprovalDialog";
import { set } from "date-fns";

type DecisionStatus = "pending" | "approved" | "rejected";

type SubmitDecisionProps = {
  status?: DecisionStatus;
  onApprove?: () => void;
  onReject?: (reason: string) => void;
  isLoading?: boolean;
  canDoAction?: boolean;
  reason?: string;
  isError?: boolean;
  errorMessage?: string;
};

const SubmitDecision = ({
  status = "pending",
  onApprove,
  onReject,
  isLoading = false,
  canDoAction = false,
  isError = false,
  errorMessage = "",
  reason,
}: SubmitDecisionProps) => {
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const handleApprove = () => {
    if (onApprove) {
      onApprove();
      if (isLoading) {
        setIsApprovalDialogOpen(true);
      }
      setIsApprovalDialogOpen(false);
    }
  };
  const handleReject = (reason: string) => {
    if (onReject) {
      onReject(reason);
      if (isLoading) {
        setIsRejectDialogOpen(true);
      }
      setIsRejectDialogOpen(false);
    }
  };
  return (
    <div className="flex-1 rounded-lg border p-5 shadow-sm space-y-4">
      {status === "pending" && (
        <>
          <h2 className="text-lg font-semibold">Make a Decision</h2>

          {!canDoAction ? (
            <p className="text-sm text-muted-foreground">
              You do not have permission to take action on this application.
            </p>
          ) : (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 gap-2 text-green-600"
                onClick={() => setIsApprovalDialogOpen(true)}
                disabled={isLoading}
              >
                <CheckCircle size={16} />
                Approve
              </Button>

              <Button
                variant="outline"
                className="flex-1 gap-2 text-red-600"
                onClick={() => setIsRejectDialogOpen(true)}
                disabled={isLoading}
              >
                <CircleAlert size={16} />
                Reject
              </Button>
            </div>
          )}
        </>
      )}

      {status === "approved" && (
        <>
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-600" />
            <h2 className="font-semibold">Application Approved</h2>
          </div>

          <p className="text-sm text-muted-foreground">
            This issuer application has been successfully approved.
          </p>

          <Badge className="bg-green-100 text-green-700">Approved</Badge>
        </>
      )}

      {status === "rejected" && (
        <>
          <div className="flex items-center gap-2">
            <XCircle className="text-red-600" />
            <h2 className="font-semibold">Application Rejected</h2>
          </div>

          <p className="text-sm text-muted-foreground">
            This issuer application has been rejected.{" "}
            {reason && (
              <span className="text-red-700">Because of {reason}</span>
            )}
          </p>

          <Badge className="bg-red-100 text-red-700">Rejected</Badge>
        </>
      )}

      <ApproveDialog
        open={isApprovalDialogOpen}
        onApprove={handleApprove}
        setOpen={setIsApprovalDialogOpen}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
      />
      <RejectApprovalDialog
        open={isRejectDialogOpen}
        onReject={(reason) => handleReject(reason)}
        setOpen={setIsRejectDialogOpen}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default SubmitDecision;
