import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Folder, useAppStore } from "@/store/appStore";

export type RenameFolderDialogProps = {
  isOpen: boolean;
  folderId: Folder["id"];
  onClose: () => void;
};

export const RenameFolderDialog = ({
  isOpen,
  folderId,
  onClose,
}: RenameFolderDialogProps) => {
  const store = useAppStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const value = (
              e.target as unknown as { folderName: { value: string } }
            ).folderName.value;
            store.renameFolder({ folderId, updatedName: value });
            onClose();
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit Folder name</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="folderName" className="text-left">
                Folder Name
              </Label>
              <Input
                id="folderName"
                name="folderName"
                placeholder="new folder name"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
