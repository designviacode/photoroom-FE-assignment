export const EmptyState = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center p-10">
      <h4 className="text-base font-semibold leading-6 text-gray-900">
        No Images in the folder
      </h4>
      <p className="mt-1 text-sm text-gray-500">
        Let's try to upload an image?
      </p>
    </div>
  );
};
