import Loading from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ApproveDialogProps {
  open: boolean;
  onApprove: () => void;
  setOpen: (open: boolean) => void;
  isLoading: boolean;
}

const ApproveDialog = ({
  open,
  onApprove,
  setOpen,
  isLoading,
}: ApproveDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loading message="Approving Issuer Application..." />{" "}
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Approval</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <p>Are you sure you want to approve this application?</p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button
                onClick={() => {
                  onApprove();
                }}
              >
                Confirm
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApproveDialog;
