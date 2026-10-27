import { Categories } from "#/constants/categories";
import { parseImage, resolvePeople } from "#/functions/exif";
import { navigateImage, removeSelectedImage } from "#/functions/images";
import type { ImportedImageData } from "#/types/Image";
import {
  CaretCircleLeftIcon,
  CaretCircleRightIcon,
  ImagesIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef } from "react";

type Props = {
  images: ImportedImageData[];
  setImages: React.Dispatch<React.SetStateAction<ImportedImageData[]>>;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
};

export default function FileSelector({
  images,
  setImages,
  selectedIndex,
  setSelectedIndex,
  className,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function selectImage(index: number) {
    setImages((currentImages) =>
      currentImages.map((image, imageIndex) => {
        if (imageIndex !== index) {
          return image;
        }

        resolvePeople(image.unresolvedPeople, image.people);

        return { ...image };
      }),
    );

    setSelectedIndex(index);
  }

  async function handleFilesSelect(files: File[]) {
    // Sequential parsing!!!
    const newFiles = files.filter(
      (file) =>
        !images.some(
          (image) =>
            image.file.name === file.name &&
            image.file.size === file.size &&
            image.file.lastModified === file.lastModified,
        ),
    );

    const parsedImages: ImportedImageData[] = [];

    for (const file of newFiles) {
      const image = await parseImage(file);
      parsedImages.push(image);
    }

    setImages((current) => [...current, ...parsedImages]);
    setSelectedIndex(selectedIndex);
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

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;

      // Ignore keypress if an input is focused
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        navigateImage({
          setSelectedIndex,
          direction: -1,
          imagesLength: images.length,
          setImages,
        });
      }

      if (event.key === "ArrowRight") {
        navigateImage({
          setSelectedIndex,
          direction: 1,
          imagesLength: images.length,
          setImages,
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, setSelectedIndex]);

  return (
    <section className={`section-box ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-row items-center gap-2">
          <ImagesIcon size={28} weight="duotone" className="hidden md:block" />
          <h1 className="text-xl font-bold">File selector</h1>
        </div>

        {images.length > 0 ? (
          <div className="flex flex-row gap-4 md:gap-6 items-center">
            <TrashIcon
              size={32}
              weight="duotone"
              className="hover:text-red-400 transition-all duration-100"
              onClick={() =>
                removeSelectedImage({
                  images,
                  setImages,
                  selectedIndex,
                  setSelectedIndex,
                })
              }
            />
            <div className="flex flex-row gap-2">
              <CaretCircleLeftIcon
                size={28}
                weight="duotone"
                className={`${selectedIndex == 0 ? "text-gray-300" : "hover:text-pink-400 cursor-pointer"} transition-all duration-100`}
                onClick={() =>
                  navigateImage({
                    setSelectedIndex,
                    direction: -1,
                    imagesLength: images.length,
                    setImages,
                  })
                }
              />
              <CaretCircleRightIcon
                size={28}
                weight="duotone"
                className={`${selectedIndex == images.length - 1 ? "text-gray-300" : "hover:text-pink-400 cursor-pointer"} transition-all duration-100`}
                onClick={() =>
                  navigateImage({
                    setSelectedIndex,
                    direction: 1,
                    imagesLength: images.length,
                    setImages,
                  })
                }
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        className={`w-full max-h-80 overflow-y-auto grid gap-2 select-none grid-cols-12 
	    ${images.length <= 0 ? "border border-gray-200 rounded-xl" : ""}`}
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
                selectImage(index);
              }}
              key={index}
              className={`${
                selectedIndex == index
                  ? `${Categories[image.category - 1].background_soft} shadow-sm border-invisible`
                  : "hover:bg-gray-200 bg-white"
              } h-auto flex flex-col items-center justify-between p-2 border border-gray-200 rounded-xl transition-all duration-100`}
            >
              <div className="h-full flex items-center justify-center mb-2">
                <img
                  src={URL.createObjectURL(image.file)}
                  className="rounded-md shadow-sm"
                />
              </div>
              <p className="w-full text-xs font-semibold md:font-normal md:text-[12px] truncate text-center">
                {image.fileName}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full h-auto flex flex-col gap-4 items-center justify-center">
            <ImagesIcon size={64} className="opacity-50" />
            <p className="text-xl italic opacity-50">
              Drag and drop images here...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
