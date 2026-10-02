import { createServerFn } from "@tanstack/react-start";
import { db } from "#/db";
import { sql } from "drizzle-orm";
import type { AddPersonToDBData } from "#/types/People";

export const getPeopleFromDB = createServerFn({
  method: "GET",
}).handler(async () => {
  const result = await db.execute(`
    SELECT *
    FROM people
  `);

  return result.rows;
});

export const addPersonToDB = createServerFn({
  method: "POST",
}).handler(async ({ data }: AddPersonToDBData) => {
  const { value, addingInstagram } = data;

  const result = addingInstagram
    ? await db.execute(sql`
      INSERT INTO people (instagram)
      VALUES (${value})
      RETURNING *`)
    : await db.execute(sql`
			  INSERT INTO people (facebook)
			  VALUES (${value})
			  RETURNING *
			  `);

  console.log(result);

  return result.rows[0];
});
