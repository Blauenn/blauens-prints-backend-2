import { uploadImageToDB } from "#/server/images";
import type { ImportedImageData } from "#/types/Image";

export type ImageNumber = {
  category: number;
  number: number;
};

// QoL : Auto numbering when parsing
export const imageNumbers: ImageNumber[] = [
  { category: 1, number: 1 },
  { category: 2, number: 1 },
  { category: 3, number: 1 },
  { category: 4, number: 1 },
  { category: 5, number: 1 },
];

export function getNextImageNumber(category: number) {
  const imageNumber = imageNumbers.find((entry) => entry.category === category);

  if (!imageNumber) {
    throw new Error(`Unknown image category: ${category}`);
  }

  const number = imageNumber.number;
  imageNumber.number += 1;

  return number;
}

export async function uploadImage(data: ImportedImageData) {
  const { file, ...imageData } = data;

  return await uploadImageToDB({
    data: imageData,
  });
}
