import { Button } from "./ui/button";
import photoroomLogo from "../../public/photoroom-logo.png";
import { Folder } from "lucide-react";

const DEFAULT_FOLDER_NAME = "Untitled Folder";

export const Sidebar = () => {
  return (
    <div className="app-sidebar flex flex-col h-dvh w-[350px] border-l border-gray-200 bg-gray-100 p-5 pt-6 space-y-3">
      <img src={photoroomLogo} width={150} className="pb-2" />

      <div className="pt-10">
        <Button className="w-full border border-slate-300 rounded-md p-2">
          New Folder
        </Button>

        <SidebarButton />
        <SidebarButton text="Folder 2" />
        <SidebarButton text="Folder 2" />
      </div>
    </div>
  );
};

function SidebarButton({ text = DEFAULT_FOLDER_NAME }: { text?: string }) {
  return (
    <div className="group flex w-full items-center text-left rounded-md p-3 pl-4 cursor-pointer hover:bg-slate-200 space-x-3">
      <Folder className="transition-all group-hover:text-blue-500 group-hover:translate-x-1" />
      <p className="transition-all text-sm font-medium group-hover:text-blue-500 group-hover:font-semibold">
        {text}
      </p>
    </div>
  );
}
