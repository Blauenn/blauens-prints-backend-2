import { parseImage } from "#/functions/exif";
import { removeSelectedImage } from "#/functions/images";
import type { ImportedImageData } from "#/types/Image";
import { useRef } from "react";

type Props = {
  images: ImportedImageData[];
  setImages: React.Dispatch<React.SetStateAction<ImportedImageData[]>>;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function FileSelector({
  images,
  setImages,
  selectedIndex,
  setSelectedIndex,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFilesSelect(files: File[]) {
    const parsedImages = await Promise.all(
      files.map((file) => parseImage(file)),
    );

    setImages((current) => {
      const newImages = parsedImages.filter((newImage) => {
        return !current.some(
          (image) =>
            image.file.name === newImage.file.name &&
            image.file.size === newImage.file.size &&
            image.file.lastModified === newImage.file.lastModified,
        );
      });

      return [...current, ...newImages];
    });

    setSelectedIndex(0);
  }

  function handleFiles(files: FileList | null) {
    if (!files) return;

    handleFilesSelect(Array.from(files));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    handleFiles(event.target.files);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    handleFiles(event.dataTransfer.files);
  }

  return (
    <section>
      <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm mb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Files selector</h1>
          <div className="flex flex-row gap-4 items-center">
            {images.length > 0 ? (
              <button
                onClick={() =>
                  removeSelectedImage({
                    images,
                    setImages,
                    selectedIndex,
                    setSelectedIndex,
                  })
                }
                className="cursor-pointer bg-red-200 rounded-xl py-2 px-4"
              >
                Remove
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className={`w-full h-[256px] max-h-[256px] overflow-y-auto grid md:max-h-[320px]  ${images.length <= 7 ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6" : "grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9"}  gap-2 ${images.length <= 0 ? "border border-gray-200 rounded-xl" : ""}`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          {images.length > 0 ? (
            images.map((image: ImportedImageData, index: number) => (
              <div
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedIndex(index);
                }}
                key={index}
                className={`${selectedIndex == index ? "bg-pink-200 shadow-sm" : "bg-white"} h-auto flex flex-col items-center justify-between py-2 px-2 border border-gray-200 rounded-xl`}
              >
                <div className="h-full flex items-center justify-center mb-2">
                  <img
                    src={URL.createObjectURL(image.file)}
                    className="rounded-md shadow-sm"
                  />
                </div>
                <h1 className="w-full text-xs md:text-16px] truncate text-center">
                  {image.fileName}
                </h1>
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center">
              <h1 className="text-2xl italic opacity-50">
                Drag and drop files here...
              </h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
