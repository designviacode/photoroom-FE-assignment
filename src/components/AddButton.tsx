import { ChangeEvent } from "react";
import { Plus } from "lucide-react";

export default function AddButton({
  onImageAdd,
}: {
  onImageAdd: (event: ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element {
  return (
    <label
      className="flex items-center justify-center cursor-pointer transition-all text-white bg-indigo-700 hover:bg-indigo-900 hover:-translate-y-1 font-medium tracking-wide p-4 px-6 rounded-full shadow-lg"
      htmlFor="customFileAdd"
    >
      <input
        type="file"
        onChange={onImageAdd}
        className="opacity-0 absolute z-0 w-0 h-0"
        id="customFileAdd"
        accept=".png, .jpg, .jpeg"
      />
      <Plus className="mr-2" />
      Upload Image
    </label>
  );
}
