import { createServerFn } from "@tanstack/react-start";
import { db } from "#/db";
import { images, printJobs } from "../../drizzle/schema";
import type { ImportedImageData } from "#/types/Image";

export const uploadImageToDB = createServerFn({
  method: "POST",
}).handler(async ({ data }: { data: ImportedImageData }) => {
  const imageToInsert = {
    categoryId: data.category,
    filename: data.fileName,
    number: data.number,
    imageUrl: data.imageUrl,
    thumbnailUrl: data.thumbnailUrl,
    width: data.width,
    height: data.height,
    cameraName: data.cameraName,
    cameraModel: data.cameraModel,
    lensModel: data.lensModel,
    iso: data.iso,
    exposureTime: data.exposureTime == null ? null : String(data.exposureTime),
    aperture: data.aperture,
    shotFocalLength: data.shotFocalLength,
    flash: data.flash,
    keywords: data.keywords,
    datetimeOriginal: data.newDate?.toISOString(),
  };

  return await db.transaction(async (transaction) => {
    const [insertedImage] = await transaction
      .insert(images)
      .values(imageToInsert)
      .returning({ id: images.id });

    if (data.printJobs.length > 0) {
      await transaction.insert(printJobs).values(
        data.printJobs.map((job) => ({
          imageId: insertedImage.id,
          personId: job.personId,
          printLabId: job.printLabId ?? null,
          size: job.size,
          paperType: job.paperType,
          sentToLabAt: job.sentToLabAt,
          receivedFromLabAt: job.recievedFromLabAt,
          deliveredAt: job.deliveredAt,
        })),
      );
    }

    return {
      imageId: insertedImage.id,
      printJobsCreated: data.printJobs.length,
    };
  });
});
