"use client";
import Loading from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type VehicleApprovalDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmApprove: () => void;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
};
export function VehicleApprovalDialog({ open, onOpenChange, onConfirmApprove, isLoading, isError, errorMessage }: VehicleApprovalDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loading message="Approving Asset..." />{" "}
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-rose-500">{errorMessage}</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Approve Asset</DialogTitle>
              <DialogDescription>
                Are you sure you want to approve this asset? This action cannot
                be undone.
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
          </>
        )}
      </DialogContent>
    </Dialog> 
        )
}