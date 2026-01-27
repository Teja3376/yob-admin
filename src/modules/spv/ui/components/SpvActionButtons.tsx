import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type SpvActionButtonsProps = {
  onRequestUpdate?: () => void;
  onApprove?: () => void;
};

const SpvActionButtons: React.FC<SpvActionButtonsProps> = ({
  onRequestUpdate,
  onApprove,
}) => {
  return (
    <div className="flex justify-end gap-3 pb-6">
      <Button variant="outline" onClick={onRequestUpdate}>
        Request to update
      </Button>
      <Button onClick={onApprove}>
        Approve SPV
        <ArrowRight size={16} />
      </Button>
    </div>
  );
};

export default SpvActionButtons;
