import { relations } from "drizzle-orm/relations";
import { images, printJobs, people, printLabs, categories } from "./schema";

export const printJobsRelations = relations(printJobs, ({ one }) => ({
  image: one(images, {
    fields: [printJobs.imageId],
    references: [images.id],
  }),
  person: one(people, {
    fields: [printJobs.personId],
    references: [people.id],
  }),
  printLab: one(printLabs, {
    fields: [printJobs.printLabId],
    references: [printLabs.id],
  }),
}));

export const imagesRelations = relations(images, ({ one, many }) => ({
  printJobs: many(printJobs),
  category: one(categories, {
    fields: [images.categoryId],
    references: [categories.id],
  }),
}));

export const peopleRelations = relations(people, ({ many }) => ({
  printJobs: many(printJobs),
}));

export const printLabsRelations = relations(printLabs, ({ many }) => ({
  printJobs: many(printJobs),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  images: many(images),
}));
