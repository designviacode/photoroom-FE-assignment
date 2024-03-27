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

export type FilePreviewProps = {
  file: Image;
};

export const FilePreview = observer(({ file }: FilePreviewProps) => {
  const store = useAppStore();

  return (
    <div className="w-[250px] hover:shadow-xl cursor-pointer transition-all">
      <Card className="group">
        <img
          src={file?.imagePath}
          alt="result from the API"
          style={{
            display: "block",
            objectFit: "cover",
            width: "100%",
            backgroundColor: "var(--gray-5)",
          }}
        />

        <DropdownMenu>
          <DropdownMenuTrigger>Move To</DropdownMenuTrigger>
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
