import { addPersonToDB, getPeopleFromDB } from "#/server/people";
import type { AddPersonToDBData, People } from "#/types/People";

export const people: People[] = [];

export async function getPeople() {
  const result = await getPeopleFromDB();

  people.splice(0, people.length, ...result);
}

export async function addPerson({ value, addingInstagram }: AddPersonToDBData) {
  const person = await addPersonToDB({
    data: {
      value,
      addingInstagram,
    },
  });

  people.push(person);

  return person;
}
