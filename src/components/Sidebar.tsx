import { Button } from "./ui/button";

const DEFAULT_FOLDER_NAME = "Untitled Folder";

export const Sidebar = () => {
  return (
    <div className="app-sidebar flex flex-col h-dvh w-[400px] border-l border-gray-200 bg-gray-100 p-5 pt-10 space-y-3">
      <Button className="w-full border border-slate-300 rounded-md p-2">
        New Folder
      </Button>

      <div className="items-center text-left rounded-md p-3 pl-4 cursor-pointer hover:bg-slate-200">
        <p className="text-sm font-semibold">{DEFAULT_FOLDER_NAME}</p>
      </div>
    </div>
  );
};
