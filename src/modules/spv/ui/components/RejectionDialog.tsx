"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

// 🔒 Validation schema
const schema = z.object({
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(200, "Reason must be at most 200 characters")
    .trim(),
});

type FormData = z.infer<typeof schema>;

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
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { reason: "" },
    mode: "onChange", // Validate on change for better UX
    reValidateMode: "onChange",
  });

  const reasonValue = watch("reason");

  // 🔁 Reset form when dialog closes
  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const onSubmit = (data: FormData) => {
    onReject(data.reason);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loading message="Rejecting SPV Application..." />
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-red-500">Error: {errorMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Reject Application</DialogTitle>
            </DialogHeader>

            <div className="space-y-3 mt-3">
              <p className="text-sm text-muted-foreground">
                Please provide a reason for rejecting this application.
              </p>

              <Textarea
                placeholder="Enter rejection reason..."
                className="wrap-break-word  w-md resize-none"
                rows={4}
                autoFocus
                {...register("reason")}
              />

              {errors.reason && (
                <p className="text-sm text-red-500">{errors.reason.message}</p>
              )}

              {/* <p className="text-xs text-muted-foreground">
                Minimum 2 characters
              </p> */}
            </div>

            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="destructive"
                disabled={isLoading || !reasonValue?.trim()}
              >
                Reject
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RejectApprovalDialog;
