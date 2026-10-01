import { updateSelectedImage } from "#/functions/images";
import type { ImportedImageData } from "#/types/Image";
import {
  ArrowFatDownIcon,
  ImageIcon,
  ImageSquareIcon,
} from "@phosphor-icons/react";

type Props = {
  selectedImage: ImportedImageData;
  setImages: React.Dispatch<React.SetStateAction<ImportedImageData[]>>;
  selectedIndex: number;
  className?: string;
};

export default function FileImageThumbnailUrls({
  selectedImage,
  setImages,
  selectedIndex,
  className,
}: Props) {
  return (
    <section>
      <div
        className={`section-box flex flex-col md:grid md:grid-cols-7 gap-4 md:gap-8 ${className}`}
      >
        {/* Image URL */}
        <div className="flex flex-row col-span-3 gap-4 items-center">
          <ImageIcon size={28} weight="duotone" className="opacity-50" />
          <input
            placeholder="Image URL"
            value={selectedImage.imageUrl}
            className={`field w-full`}
            onChange={(event) => {
              updateSelectedImage(
                "imageUrl",
                event.target.value,
                setImages,
                selectedIndex,
              );
            }}
          />
        </div>

        <div className="flex col-span-1 items-center justify-center">
          <button className="button w-full flex flex-row items-center justify-center gap-4 bg-gray-200 hover:bg-gray-300">
            Copy
            <ArrowFatDownIcon
              size={24}
              weight="duotone"
              onChange={() => {
                updateSelectedImage(
                  "thumbnailUrl",
                  selectedImage.imageUrl,
                  setImages,
                  selectedIndex,
                );
              }}

              className="md:-rotate-90"
            />
          </button>
        </div>

        {/* Thumbnail URL */}
        <div className="flex flex-row col-span-3 gap-4 items-center">
          <ImageSquareIcon size={28} weight="duotone" className="opacity-50" />
          <input
            placeholder="Thumbnail URL"
            value={selectedImage.thumbnailUrl}
            className={`field w-full`}
            onChange={(event) => {
              updateSelectedImage(
                "thumbnailUrl",
                event.target.value,
                setImages,
                selectedIndex,
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}
