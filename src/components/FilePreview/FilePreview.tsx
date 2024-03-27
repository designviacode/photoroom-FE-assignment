import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "../ui/card";
import { observer } from "mobx-react-lite";
import { Image, useAppStore } from "@/store/appStore";
import { EllipsisVertical } from "lucide-react";

export type FilePreviewProps = {
  file: Image;
};

export const FilePreview = observer(({ file }: FilePreviewProps) => {
  const store = useAppStore();

  return (
    <div className="relative h-[250px] w-[250px] hover:shadow-xl cursor-pointer transition-all">
      <Card className="group w-full h-full overflow-hidden">
        <img
          src={file?.imagePath}
          alt="result from the API"
          style={{
            display: "block",
            objectFit: "cover",
            height: "100%",
            width: "100%",
            backgroundColor: "var(--gray-5)",
          }}
        />

        <DropdownMenu>
          <DropdownMenuTrigger className="absolute right-2 top-2">
            <div
              title="click for more.."
              className="cursor-pointer opacity-50 hover:opacity-100 hover:bg-slate-200 h-10 w-10 rounded-full flex items-center justify-center bg-slate-100"
            >
              <EllipsisVertical className="hover:scale-125 hover:opacity-100 transition-all" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            {store.folders
              .filter((folder) => folder.id !== file.folderId)
              .map((folder) => (
                <DropdownMenuItem
                  key={folder.id}
                  onClick={() => {
                    console.log("Moving to folder", folder.id, file.id);
                    store.moveTo({ folderId: folder.id, imageId: file.id });
                  }}
                >
                  {folder.name}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </Card>
    </div>
  );
});
