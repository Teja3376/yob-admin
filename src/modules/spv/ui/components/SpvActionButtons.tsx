import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, CheckCircle } from "lucide-react";
import clsx from "clsx";

type SpvActionButtonsProps = {
  onRequestUpdate?: () => void;
  onApprove?: () => void;
  isApproved?: boolean;
  canDoAction?: boolean;
};

const SpvActionButtons: React.FC<SpvActionButtonsProps> = ({
  onRequestUpdate,
  onApprove,
  isApproved,
  canDoAction = false,
}) => {
  return (
    <>
      {!canDoAction ? (
        <div
          className={clsx(
            isApproved ? "hidden" : "flex",
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
            isApproved ? "hidden" : "flex",
            " justify-end gap-3 pb-6",
          )}
        >
          <Button variant="outline" onClick={onRequestUpdate}>
            Request to update
          </Button>
          <Button onClick={onApprove}>
            {isApproved ? (
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
        </div>
      )}
    </>
  );
};

export default SpvActionButtons;
