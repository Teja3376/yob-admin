import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import Loading from "@/components/Loader";

type ApprovalDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmApprove: () => void;
  isLoading: boolean;
};

const ApprovalDialog = ({
  open,
  onOpenChange,
  onConfirmApprove,
  isLoading,
}: ApprovalDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loading message="Approving SPV..." />{" "}
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Approve SPV</DialogTitle>
              <DialogDescription>
                Are you sure you want to approve this SPV? This action cannot be
                undone.
                <br />
                Once you activate the SPV, the issuer will be able to use it for
                assets under management.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={onConfirmApprove}>Approve</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApprovalDialog;
