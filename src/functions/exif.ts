import type { ImportedImageData } from "#/types/Image";
import exifr from "exifr";

export async function parseImage(file: File): Promise<ImportedImageData> {
  const image: ImportedImageData = {
    file,
    category: 1,
    fileName: file.name,
    number: 0,
    imageUrl: "",
    thumbnailUrl: "",
    flash: false,
    people: [],
    keywords: [],
  };

  try {
    const exif = await exifr.parse(file, { xmp: true });

    const focalLength = exif?.LensSpecification?.[0];
    const focalLengthMax = exif?.LensSpecification?.[1];

    const flash = exif?.Flash?.startsWith("Flash fired") ?? false;

    // Split "and" or "," into an array
    const people = (exif?.ImageDescription ?? "")
      .split(/\s+and\s+|,/)
      .map((person: string) => person.trim())
      .filter(Boolean);

    image.fileName = exif?.PreservedFileName;
    image.cameraName = exif?.Make;
    image.cameraModel = exif?.Model;
    image.lensModel = exif?.LensModel;
    image.focalLength = focalLength;
    image.focalLengthMax = focalLengthMax;
    image.iso = exif?.ISO;
    image.exposureTime = exif?.ExposureTime;
    image.aperture = exif?.FNumber;
    image.shotFocalLength = exif?.FocalLength;
    image.flash = flash;
    image.dateTimeOriginal = exif?.DateTimeOriginal;
    image.newDate = exif?.DateTimeOriginal;
    image.people = people;
    image.keywords = exif?.subject ?? [];
    image.newKeywords = exif?.subject ?? [];

    // Category from keywords
    image.category = parseCategory(image.keywords);
  } catch (error) {
    console.error(`Failed to parse image: ${file.name}`, error);
  }

  const dimensions = file.name.match(/(\d+)\s*x\s*(\d+)/);

  if (dimensions) {
    image.width = Number(dimensions[1]);
    image.height = Number(dimensions[2]);
  }

  return image;
}

export async function parseImages(files: File[]): Promise<ImportedImageData[]> {
  const images: ImportedImageData[] = [];

  for (const file of files) {
    const image = await parseImage(file);
    images.push(image);
  }

  return images;
}

const categoryMap: Record<string, number> = {
  randoms: 5,
  "four-legged friends": 4,
  "non-bm-prints": 3,
  wiwi: 1,
};

function parseCategory(keywords: string[]) {
  for (const keyword of keywords) {
    const normalizedKeyword = keyword.toLowerCase();

    if (/^blauens meisterwerk \(vol\.\d+\)$/.test(normalizedKeyword)) {
      return 2;
    }

    const category = categoryMap[normalizedKeyword];

    if (category !== undefined) {
      return category;
    }
  }

  return 1;
}
