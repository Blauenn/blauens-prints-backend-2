import { updateSelectedImage } from "#/functions/images";
import type { ImportedImageData } from "#/types/Image";
import {
  ArrowCounterClockwiseIcon,
  PlusCircleIcon,
} from "@phosphor-icons/react";

type Props = {
  selectedImage: ImportedImageData;
  setImages: React.Dispatch<React.SetStateAction<ImportedImageData[]>>;
  selectedIndex: number;
  className?: string;
};

function removeKeyword(
  keywords: string[],
  keywordToRemove: string,
  setImages: React.Dispatch<React.SetStateAction<ImportedImageData[]>>,
  selectedIndex: number,
) {
  const newKeywords = keywords.filter((keyword) => keyword !== keywordToRemove);

  setImages((current) =>
    current.map((image, index) =>
      index === selectedIndex ? { ...image, newKeywords: newKeywords } : image,
    ),
  );
}

export default function FileKeywords({
  selectedImage,
  setImages,
  selectedIndex,
  className,
}: Props) {
  return (
    <section>
      <div className={`section-box ${className}`}>
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-bold mb-4">Keywords</h1>
          <div className="flex flex-row gap-4">
            <ArrowCounterClockwiseIcon
              size={28}
              onClick={() => {
                updateSelectedImage(
                  "newKeywords",
                  selectedImage.keywords,
                  setImages,
                  selectedIndex,
                );
              }}
              className="cursor-pointer hover:text-blue-400 transition-all duration-100"
            />
            <PlusCircleIcon
              size={28}
              weight="duotone"
              className="cursor-pointer hover:text-green-400 transition-all duration-100"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedImage.newKeywords.length > 0 ? (
            selectedImage.newKeywords.map((keyword: string) => (
              <div
                key={keyword}
                onClick={() =>
                  removeKeyword(
                    selectedImage.newKeywords,
                    keyword,
                    setImages,
                    selectedIndex,
                  )
                }
                className={`button flex flex-row items-center justify-between gap-2 bg-gray-200 hover:bg-red-400 hover:text-white hover:italic`}
              >
                <p>{keyword}</p>
              </div>
            ))
          ) : (
            <p>No keywords</p>
          )}
        </div>
      </div>
    </section>
  );
}
