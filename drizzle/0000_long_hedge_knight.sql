-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"filename" varchar(255) NOT NULL,
	"number" integer,
	"image_url" varchar(255) NOT NULL,
	"thumbnail_url" varchar(255),
	"width" integer,
	"height" integer,
	"camera_name" varchar(64),
	"camera_model" varchar(64),
	"lens_model" varchar(64),
	"focal_length" integer,
	"focal_length_max" integer,
	"iso" integer,
	"exposureTime" varchar(32),
	"aperture" real,
	"shot_focal_length" real,
	"flash" boolean,
	"created_at" timestamp,
	"keywords" text[],
	CONSTRAINT "images_category_id_number_unique" UNIQUE("category_id","number")
);
--> statement-breakpoint
CREATE TABLE "print_labs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	CONSTRAINT "print_labs_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "print_jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_id" integer NOT NULL,
	"person_id" integer NOT NULL,
	"print_lab_id" integer,
	"size" varchar(32),
	"paper_type" varchar(64),
	"sent_to_lab_at" timestamp,
	"received_from_lab_at" timestamp,
	"delivered_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"name_short" varchar
);
--> statement-breakpoint
CREATE TABLE "people" (
	"id" serial PRIMARY KEY NOT NULL,
	"facebook" varchar(255),
	"facebook_handle" varchar(64),
	"instagram" varchar(64),
	CONSTRAINT "people_facebook_handle_unique" UNIQUE("facebook_handle"),
	CONSTRAINT "people_instagram_unique" UNIQUE("instagram")
);
--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "print_jobs" ADD CONSTRAINT "print_jobs_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "print_jobs" ADD CONSTRAINT "print_jobs_person_id_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "print_jobs" ADD CONSTRAINT "print_jobs_print_lab_id_print_labs_id_fk" FOREIGN KEY ("print_lab_id") REFERENCES "public"."print_labs"("id") ON DELETE no action ON UPDATE no action;
*/