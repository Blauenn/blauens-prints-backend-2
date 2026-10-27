import type { ImportedImageData } from "#/types/Image";
import type { People } from "#/types/People";
import { resolvePeople } from "./exif";

type RemoveSelectedImage = {
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
}: RemoveSelectedImage) {
  const newImages = images.filter((_, index) => index !== selectedIndex);

  setImages(newImages);

  if (newImages.length === 0) {
    setSelectedIndex(0);
  } else if (selectedIndex >= newImages.length) {
    setSelectedIndex(newImages.length - 1);
  }
}

type NavigateImageProps = {
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  direction: number;
  imagesLength: number;
  setImages: React.Dispatch<React.SetStateAction<ImportedImageData[]>>;
};

export function navigateImage({
  setSelectedIndex,
  direction,
  imagesLength,
  setImages,
}: NavigateImageProps) {
  setSelectedIndex((current) => {
    const nextIndex = current + direction;

    if (nextIndex < 0 || nextIndex >= imagesLength) {
      return current;
    }

    setImages((currentImages) =>
      currentImages.map((image, index) => {
        if (index !== nextIndex) {
          return image;
        }

        resolvePeople(image.unresolvedPeople, image.people);

        return { ...image };
      }),
    );

    return nextIndex;
  });
}

export function updateSelectedImage(
  field: keyof ImportedImageData,
  value: ImportedImageData[keyof ImportedImageData],
  setImages: React.Dispatch<React.SetStateAction<ImportedImageData[]>>,
  selectedIndex: number,
) {
  setImages((current) =>
    current.map((image, index) =>
      index === selectedIndex ? { ...image, [field]: value } : image,
    ),
  );
}
