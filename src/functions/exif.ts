import type { ImportedImageData } from "#/types/Image";
import exifr from "exifr";

export async function parseImage(file: File): Promise<ImportedImageData> {
  const image: ImportedImageData = {
    file,
    category: 0,
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

    const dimensions = file.name
      .split("-")
      .at(-1)
      ?.split(".")[0]
      .replaceAll(" ", "");

    const width = Number(dimensions?.split("x")[0]);
    const height = Number(dimensions?.split("x")[1]);

    const flash = exif?.Flash?.startsWith("Flash fired") ?? false;

    // Split "and" or "," into an array
    let people = exif.ImageDescription.split(/\s+and\s+|,/)
      .map((person: string) => person.trim())
      .filter(Boolean);

    image.fileName = exif?.PreservedFileName;
    image.width = width;
    image.height = height;
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
  } catch (error) {
    console.error(`Failed to parse image: ${file.name}`, error);
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
