import { people } from "#/data/people";
import type { ImportedImageData } from "#/types/Image";
import exifr from "exifr";
import { normalizePersonName } from "./strings";
import type { People } from "#/types/People";
import { getNextImageNumber } from "#/data/images";

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
    unresolvedPeople: [],
    printJobs: [],
    keywords: [],
    newKeywords: [],
  };

  try {
    const exif = await exifr.parse(file, { xmp: true });

    const focalLength = exif?.LensSpecification?.[0];
    const focalLengthMax = exif?.LensSpecification?.[1];

    const flash = exif?.Flash?.startsWith("Flash fired") ?? false;

    // Split "and" or "," into an array
    const peoplePlain = (exif?.ImageDescription ?? "")
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
    image.people = [];
    image.unresolvedPeople = peoplePlain;
    image.keywords = exif?.subject ?? [];
    image.newKeywords = exif?.subject ?? [];

    resolvePeople(image.unresolvedPeople, image.people);

    // Category from keywords
    const imageIdentity: {
      category: number;
      number: number;
    } = parseCategory(image.keywords);

    image.category = imageIdentity.category;
    image.number = imageIdentity.number;
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
  let category = 1;

  for (const keyword of keywords) {
    const normalizedKeyword = keyword.toLowerCase();

    if (/^blauens meisterwerk \(vol\.\d+\)$/.test(normalizedKeyword)) {
      category = 2;
      break;
    }

    const mappedCategory = categoryMap[normalizedKeyword];

    if (mappedCategory !== undefined) {
      category = mappedCategory;
      break;
    }
  }

  return {
    category,
    number: getNextImageNumber(category),
  };
}

export function resolvePeople(
  unresolvedPeople: string[],
  selectedPeople: People[],
) {
  // Check if parsed person in the ImageDescription exists in the people table,
  // if it does, preselect that person by adding the object to image.people
  const remainingPeople = unresolvedPeople.filter((name) => {
    const normalizedName = normalizePersonName(name);

    const matchedPerson = people.find(
      (person) =>
        normalizePersonName(person.facebook ?? "") === normalizedName ||
        normalizePersonName(person.instagram ?? "") === normalizedName,
    );
    if (matchedPerson) {
      selectedPeople.push(matchedPerson);
      return false;
    }

    return true;
  });

  unresolvedPeople.splice(0, unresolvedPeople.length, ...remainingPeople);
}
