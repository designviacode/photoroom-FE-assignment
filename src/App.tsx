import { ChangeEvent, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import AddButton from "./components/AddButton";
import loadImage, { LoadImageResult } from "blueimp-load-image";
import { API_KEY, API_URL, BASE64_IMAGE_HEADER } from "./constants";
import { FilePreview } from "./components/FilePreview";
import { AppStore, AppStoreProvider, useAppStore } from "./store/appStore";
import { nanoid } from "nanoid";
import { observer } from "mobx-react-lite";
import { EmptyState } from "./components/EmptyState";
import { RenameFolderDialog } from "./components/RenameFolderDialog";

const FileList = observer(() => {
  const { currentFolderImages } = useAppStore();

  return (
    <div className="flex flex-wrap p-6">
      {currentFolderImages?.length > 0 ? (
        currentFolderImages.map((file) => (
          <div key={file.id} className="flex flex-wrap p-2">
            <FilePreview file={file} />
          </div>
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
});

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [renamingFolderId, setRenamingFolderId] = useState<string>("");
  const [appStore] = useState(() => new AppStore());

  const getUploadedImageAsBase64 = async (
    file: File
  ): Promise<string | null> => {
    try {
      setIsLoading(true);
      const imageData: LoadImageResult = await loadImage(file, {
        maxWidth: 400,
        maxHeight: 400,
        canvas: true,
      });
      const image = imageData.image as HTMLCanvasElement;
      const imageBase64 = image.toDataURL("image/png");
      const imageBase64Data = imageBase64.replace(BASE64_IMAGE_HEADER, "");
      const data = {
        image_file_b64: imageBase64Data,
      };
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify(data),
      });
      setIsLoading(false);

      if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
      }

      const result = await response.json();
      const base64Result = BASE64_IMAGE_HEADER + result.result_b64;

      return base64Result;
    } catch (error) {
      console.error("Error uploading image", error);
      setIsLoading(false);
      return null;
    }
  };

  const onImageAdd = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const folderIdWhileAdding = appStore.currentFolderId;
      const newImageStr = await getUploadedImageAsBase64(e.target.files[0]);
      if (newImageStr) {
        const image = {
          imagePath: newImageStr,
          id: nanoid(),
          folderId: folderIdWhileAdding,
        };
        appStore.addImage(image);
      }
    } else {
      console.error("No file was picked");
    }
  };

  return (
    <AppStoreProvider store={appStore}>
      <div className="flex w-full">
        <Sidebar onRename={setRenamingFolderId} />

        <div className="app-content flex flex-col w-full h-screen pb-10 overflow-auto">
          <div className="w-full flex justify-end py-4 px-8 sticky top-0 bg-white z-[1]">
            <AddButton onImageAdd={onImageAdd} isLoading={isLoading} />
          </div>

          <FileList />
        </div>

        <RenameFolderDialog
          isOpen={Boolean(renamingFolderId)}
          folderId={renamingFolderId}
          onClose={() => setRenamingFolderId("")}
        />
      </div>
    </AppStoreProvider>
  );
}


export default App;
