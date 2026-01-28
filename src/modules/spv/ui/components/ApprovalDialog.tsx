import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";

    type ApprovalDialogProps = {
        open: boolean;
        onOpenChange: (open: boolean) => void;
        onConfirmApprove: () => void;
    };

    const ApprovalDialog = ({ open, onOpenChange, onConfirmApprove }: ApprovalDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve SPV</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this SPV ? This action cannot be undone.
              <br />
              Once you have active the Spv the issuer will be able to use the Spv to a assets under management.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button onClick={onConfirmApprove}>
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
};

export default ApprovalDialog;