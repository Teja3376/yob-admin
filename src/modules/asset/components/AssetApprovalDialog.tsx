"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type AssetApprovalDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmApprove: () => void;
  isLoading?: boolean;
};

const AssetApprovalDialog = ({
  open,
  onOpenChange,
  onConfirmApprove,
  isLoading = false,
}: AssetApprovalDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Asset</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this asset? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={onConfirmApprove} disabled={isLoading}>
            {isLoading ? "Approving..." : "Approve"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssetApprovalDialog;

