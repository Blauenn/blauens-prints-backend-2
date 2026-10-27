import { createServerFn } from "@tanstack/react-start";
import { db } from "#/db";
import { people as peopleTable } from "../../drizzle/schema";
import type { AddPersonToDBData } from "#/types/People";

export const getPeopleFromDB = createServerFn({
  method: "GET",
}).handler(async () => {
  return await db.select().from(peopleTable);
});

export const addPersonToDB = createServerFn({
  method: "POST",
}).handler(async ({ data }: AddPersonToDBData) => {
  const { value, addingInstagram } = data;

  const [person] = addingInstagram
    ? await db.insert(peopleTable).values({ instagram: value }).returning()
    : await db.insert(peopleTable).values({ facebook: value }).returning();

  return person;
});
