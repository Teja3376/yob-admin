import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, CheckCircle } from "lucide-react";
import clsx from "clsx";

type SpvActionButtonsProps = {
  onApprove?: () => void;
  onReject?: () => void;
  status?: string;
  reason?: string;
  canDoAction?: boolean;
};

const SpvActionButtons: React.FC<SpvActionButtonsProps> = ({
  onApprove,
  onReject,
  status,
  reason,
  canDoAction = false,
}) => {
  return (
    <>
      {!canDoAction ? (
        <div
          className={clsx(
            status !== "Pending" ? "hidden" : "flex",
            " justify-start gap-3 p-4",
          )}
        >
          <p className="text-sm text-muted-foreground ">
            You do not have permission to take action on this SPV.
          </p>
        </div>
      ) : (
        <div
          className={clsx(
            status !== "Pending" ? "hidden" : "flex",
            " justify-end gap-3 pb-6",
          )}
        >
          <Button onClick={onApprove}>
            {status !== "Pending" ? (
              <>
                <span>Approved</span>
                <CheckCircle size={16} />
              </>
            ) : (
              <>
                <span>Approve SPV</span>
                <ArrowRight size={16} />
              </>
            )}
          </Button>
          <Button variant="destructive" onClick={onReject}>
            Reject
          </Button>
        </div>
      )}
    </>
  );
};

export default SpvActionButtons;
