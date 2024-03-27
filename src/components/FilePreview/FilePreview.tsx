import { File } from "@/store/appStore";
import { Card } from "../ui/card";

export type FilePreviewProps = {
  file: File;
};

export const FilePreview = ({ file }: FilePreviewProps) => {
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
      </Card>
    </div>
  );
};
