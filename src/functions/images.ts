import type { ImportedImageData } from "#/types/Image";

type Props = {
  images: ImportedImageData[];
  setImages: React.Dispatch<React.SetStateAction<ImportedImageData[]>>;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};

export function removeSelectedImage({
  images,
  setImages,
  selectedIndex,
  setSelectedIndex,
}: Props) {
  const newImages = images.filter((_, index) => index !== selectedIndex);

  setImages(newImages);

  if (newImages.length === 0) {
    setSelectedIndex(0);
  } else if (selectedIndex >= newImages.length) {
    setSelectedIndex(newImages.length - 1);
  }
}
