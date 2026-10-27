import { PlusCircleIcon } from "@phosphor-icons/react";
import { useState, type SetStateAction } from "react";
import FilePeopleAddButtonField from "./FilePeopleAddButtonField";
import type { ImportedImageData } from "#/types/Image";
import type { People } from "#/types/People";

type Props = {
  setImages: React.Dispatch<SetStateAction<ImportedImageData[]>>;
  selectedIndex: number;
  setPeople: React.Dispatch<SetStateAction<People[]>>;
  peopleSearch: string;
  unresolvedPeople: string[];
};

export default function FilePeopleAddButton({
  setImages,
  selectedIndex,
  setPeople,
  peopleSearch,
  unresolvedPeople,
}: Props) {
  const [addingPerson, setAddingPerson] = useState(false);

  return (
    <div>
      {unresolvedPeople.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {unresolvedPeople.map((person) => (
            <FilePeopleAddButtonField
              key={person}
              setImages={setImages}
              selectedIndex={selectedIndex}
              setPeople={setPeople}
              setAddingPerson={setAddingPerson}
              defaultValue={person}
              unresolvedPeople={unresolvedPeople}
            />
          ))}
        </div>
      ) : !addingPerson ? (
        <div
          onClick={() => {
            setAddingPerson(true);
          }}
          className="button flex flex-row gap-2 justify-start items-center border border-gray-200 hover:text-green-400 hover:border-green-400 group"
        >
          <PlusCircleIcon size={22} weight="duotone" className="button-icon" />
          <p className="italic">Add person</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <FilePeopleAddButtonField
            setImages={setImages}
            selectedIndex={selectedIndex}
            setPeople={setPeople}
            setAddingPerson={setAddingPerson}
            defaultValue={peopleSearch}
          />
        </div>
      )}
    </div>
  );
}
