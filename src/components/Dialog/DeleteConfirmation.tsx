"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeleteDialogStore } from "@/store/DeleteDialogStore";

interface IDeleteConfirmation {
  confirm: () => void;
}

export function DeleteConfirmation({ confirm }: IDeleteConfirmation) {
  const isDeleteDialogOpen = DeleteDialogStore((state) => state.isOpen);

  const setOpenDialog = DeleteDialogStore((state) => state.setOpenDialog);
  const name = DeleteDialogStore((state) => state.dialogName);

  function onSubmit() {
    setOpenDialog(false);
    confirm();
  }
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setOpenDialog}>
      <DialogContent className="overflow-y-scroll max-h-[calc(100vh-100px)] p-8">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete {name}?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this {name} from our database?
        </DialogDescription>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </Button>
          <Button variant="destructive" type="submit" onClick={onSubmit}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
