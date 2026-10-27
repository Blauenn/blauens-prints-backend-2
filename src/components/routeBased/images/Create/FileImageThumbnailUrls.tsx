import { updateSelectedImage } from "#/functions/images";
import type { ImportedImageData } from "#/types/Image";
import { ImageIcon, ImageSquareIcon } from "@phosphor-icons/react";

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
    <section className={`section-box flex gap-8 ${className}`}>
      {/* Image URL */}
      <div className="flex-1 flex flex-row col-span-3 gap-4 items-center">
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

      {/* Thumbnail URL */}
      <div className="flex-1 flex flex-row col-span-3 gap-4 items-center">
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
    </section>
  );
}
