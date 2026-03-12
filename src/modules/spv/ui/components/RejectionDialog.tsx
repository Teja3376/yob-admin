"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/Loader";

interface RejectApprovalDialogProps {
  open: boolean;
  onReject: (reason: string) => void;
  setOpen: (open: boolean) => void;
  isLoading: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const RejectApprovalDialog = ({
  open,
  onReject,
  setOpen,
  isLoading,
  isError,
  errorMessage,
}: RejectApprovalDialogProps) => {
  const [reason, setReason] = useState("");

  const handleReject = () => {
    if (!reason.trim()) return;

    onReject(reason);
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loading message="Rejecting SPV Application..." />{" "}
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-red-500">Error: {errorMessage}</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Reject Application</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Please provide a reason for rejecting this application.
              </p>

              <Textarea
                placeholder="Enter rejection reason..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
              />
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>

              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={!reason.trim() || isLoading}
              >
                {/* {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )} */}
                Reject
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RejectApprovalDialog;
