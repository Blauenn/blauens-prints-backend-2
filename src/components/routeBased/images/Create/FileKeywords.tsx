import type { ImportedImageData } from "#/types/Image";
import {
  ArrowCounterClockwiseIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@phosphor-icons/react";

type Props = {
  selectedImage: ImportedImageData;
  setImages: React.Dispatch<React.SetStateAction<ImportedImageData[]>>;
  selectedIndex: number;
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
}: Props) {
  return (
    <section>
      <div className="section-box mb-4">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-bold mb-4">Keywords</h1>
          <div className="flex flex-row gap-4">
            <ArrowCounterClockwiseIcon
              size={30}
              className="cursor-pointer hover:text-blue-400 transition-all duration-100"
            />
            <PlusCircleIcon
              size={30}
              weight="duotone"
              className="cursor-pointer hover:text-green-400 transition-all duration-100"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedImage.keywords.map((keyword: string) => (
            <div
              key={keyword}
              className="button pr-3 flex flex-row items-center justify-between gap-2 bg-gray-200"
            >
              <h1>{keyword}</h1>
              <XCircleIcon
                size={20}
                weight="regular"
                onClick={() =>
                  removeKeyword(
                    selectedImage.newKeywords,
                    keyword,
                    setImages,
                    selectedIndex,
                  )
                }
                className="opacity-50 hover:opacity-100 hover:text-red-400"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
