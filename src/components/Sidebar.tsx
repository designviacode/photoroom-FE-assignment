import { Button } from "./ui/button";
import photoroomLogo from "../../public/photoroom-logo.png";
import { useAppStore } from "../store/appStore";
import { Folder } from "lucide-react";
import { observer } from "mobx-react-lite";

export const Sidebar = observer(() => {
  const store = useAppStore();

  return (
    <div className="app-sidebar flex flex-col h-dvh w-[350px] border-l border-gray-200 bg-gray-100 p-5 pt-6 space-y-3">
      <img src={photoroomLogo} width={150} className="pb-2" />

      <div className="pt-10 space-y-2">
        <Button
          className="w-full border border-slate-300 rounded-md p-2"
          type="button"
          onClick={() =>
            store.makeNewFolder(`Folder ${store.totalFoldersCount + 1}`)
          }
        >
          New Folder
        </Button>

        {store.folders.map((folder) => (
          <SidebarButton
            key={folder.id}
            folderId={folder.id}
            text={folder.name}
          />
        ))}
      </div>
    </div>
  );
});

const SidebarButton = observer(
  ({ text, folderId }: { text: string; folderId: string }) => {
    const store = useAppStore();

    return (
      <div
        className="group flex w-full items-center text-left rounded-md p-3 pl-4 cursor-pointer hover:bg-slate-200 space-x-3"
        // onClick={() => store.setCurrentFolderId(folderId)}
        onClick={() => {
          console.log(folderId);
          store.setCurrentFolderId(folderId);
        }}
      >
        <Folder className="transition-all group-hover:text-blue-500 group-hover:translate-x-1" />
        <p className="transition-all text-sm font-medium group-hover:text-blue-500 group-hover:font-semibold">
          {text}
        </p>
      </div>
    );
  }
);
