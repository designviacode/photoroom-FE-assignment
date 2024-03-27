import { Card } from "../ui/card";

export type FilePreviewProps = {
  image: string;
};

export const FilePreview = ({ image }: FilePreviewProps) => {
  return (
    <div className="w-[250px] hover:shadow-xl cursor-pointer transition-all">
      <Card className="group">
        <img
          src={image}
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
