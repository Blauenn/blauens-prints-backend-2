import {
  pgTable,
  unique,
  serial,
  varchar,
  foreignKey,
  integer,
  timestamp,
  numeric,
  real,
  boolean,
  text,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const printLabs = pgTable(
  "print_labs",
  {
    id: serial().primaryKey().notNull(),
    name: varchar({ length: 64 }).notNull(),
  },
  (table) => [unique("print_labs_name_unique").on(table.name)],
);

export const categories = pgTable("categories", {
  id: serial().primaryKey().notNull(),
  name: varchar({ length: 64 }).notNull(),
});

export const printJobs = pgTable(
  "print_jobs",
  {
    id: serial().primaryKey().notNull(),
    imageId: integer("image_id").notNull(),
    personId: integer("person_id").notNull(),
    printLabId: integer("print_lab_id"),
    size: varchar({ length: 32 }),
    paperType: varchar("paper_type", { length: 64 }),
    sentToLabAt: timestamp("sent_to_lab_at", { mode: "string" }),
    receivedFromLabAt: timestamp("received_from_lab_at", { mode: "string" }),
    deliveredAt: timestamp("delivered_at", { mode: "string" }),
  },
  (table) => [
    foreignKey({
      columns: [table.imageId],
      foreignColumns: [images.id],
      name: "print_jobs_image_id_images_id_fk",
    }),
    foreignKey({
      columns: [table.personId],
      foreignColumns: [people.id],
      name: "print_jobs_person_id_people_id_fk",
    }),
    foreignKey({
      columns: [table.printLabId],
      foreignColumns: [printLabs.id],
      name: "print_jobs_print_lab_id_print_labs_id_fk",
    }),
  ],
);

export const people = pgTable(
  "people",
  {
    id: serial().primaryKey().notNull(),
    facebook: varchar({ length: 255 }),
    facebookHandle: varchar("facebook_handle", { length: 64 }),
    instagram: varchar({ length: 64 }),
  },
  (table) => [
    unique("people_facebook_handle_unique").on(table.facebookHandle),
    unique("people_instagram_unique").on(table.instagram),
  ],
);

export const images = pgTable(
  "images",
  {
    id: serial().primaryKey().notNull(),
    categoryId: integer("category_id").notNull(),
    filename: varchar({ length: 255 }).notNull(),
    number: integer(),
    imageUrl: varchar("image_url", { length: 255 }).notNull(),
    thumbnailUrl: varchar("thumbnail_url", { length: 255 }),
    width: integer(),
    height: integer(),
    cameraName: varchar("camera_name", { length: 64 }),
    cameraModel: varchar("camera_model", { length: 64 }),
    lensModel: varchar("lens_model", { length: 64 }),
    iso: integer(),
    exposureTime: numeric("exposure_time"),
    aperture: real(),
    shotFocalLength: real("shot_focal_length"),
    flash: boolean(),
    datetimeOriginal: timestamp("datetime_original", { mode: "string" }),
    keywords: text().array(),
  },
  (table) => [
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: "images_category_id_categories_id_fk",
    }),
    unique("images_category_id_number_unique").on(
      table.categoryId,
      table.number,
    ),
  ],
);
