import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";

interface DeleteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: string;
  onDelete: () => void;
}

const DeleteDialog = ({ open, setOpen, type, onDelete }: DeleteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogTitle>Delete {type}</DialogTitle>
        <p className="mt-2 text-sm text-gray-600">
          Are you sure you want to delete this {type}? This action cannot be
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
