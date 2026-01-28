import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, CheckCircle } from "lucide-react";

type SpvActionButtonsProps = {
  onRequestUpdate?: () => void;
  onApprove?: () => void;
  isApproved?: boolean;
};

const SpvActionButtons: React.FC<SpvActionButtonsProps> = ({
  onRequestUpdate,
  onApprove,
  isApproved,
}) => {
  return (
    <div className="flex justify-end gap-3 pb-6">
      <Button variant="outline" onClick={onRequestUpdate}>
        Request to update
      </Button>
      <Button onClick={onApprove} >
        {isApproved ? <>
        <span >Approved</span>
        <CheckCircle size={16}  />
        </> : <>
        <span>Approve SPV</span>
        <ArrowRight size={16} />
        </>
        }
      </Button>
    </div>
  );
};

export default SpvActionButtons;
