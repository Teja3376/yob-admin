import Loading from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShieldBan } from "lucide-react";

interface DeleteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: string;
  onDelete: () => void;
  isDeleting?: boolean;
  error?: string | null;
  isError?: boolean;
}

const DeleteDialog = ({
  open,
  setOpen,
  type,
  onDelete,
  isDeleting,
  error,
  isError,
}: DeleteDialogProps) => {
  if (isDeleting) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <Loading message="Loading..." />
        </DialogContent>
      </Dialog>
    );
  }
  if (isError && error) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl flex flex-col items-center gap-3">
          <div className="bg-red-500/10 border border-red-600 p-4 rounded-full">
          <ShieldBan className="text-red-600" size={48} />
          </div>
          <DialogTitle className="text-red-600">Error Deleting {type}</DialogTitle>
          <p className="text-muted-foreground text-sm">{error}</p>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogTitle>Delete {type}</DialogTitle>
        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to delete this {type}? This action cannot be
          undone.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
