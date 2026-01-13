import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CircleAlert, LoaderCircle, XCircle } from "lucide-react";

type DecisionStatus = "pending" | "approved" | "rejected";

type SubmitDecisionProps = {
  status?: DecisionStatus;
  onApprove?: () => void;
  onReject?: () => void;
  disabled?: boolean;
};

const SubmitDecision = ({
  status = "pending",
  onApprove,
  onReject,
  disabled = false,
}: SubmitDecisionProps) => {
  return (
    <div className="w-full rounded-lg border p-5 shadow-sm space-y-4">
      {status === "pending" &&
        (disabled ? (
          <div className="flex items-center justify-center mt-20">
            <LoaderCircle size={40} className="animate-spin text-primary" />
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold">Make a Decision</h2>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 gap-2 text-green-600"
                onClick={onApprove}
                disabled={disabled}
              >
                <CheckCircle size={16} />
                Approve
              </Button>

              <Button
                variant="outline"
                className="flex-1 gap-2 text-red-600"
                onClick={onReject}
                disabled={disabled}
              >
                <CircleAlert size={16} />
                Reject
              </Button>
            </div>
          </>
        ))}

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
            This issuer application has been rejected.
          </p>

          <Badge className="bg-red-100 text-red-700">Rejected</Badge>
        </>
      )}
    </div>
  );
};

export default SubmitDecision;
