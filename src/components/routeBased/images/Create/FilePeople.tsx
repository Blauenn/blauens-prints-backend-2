import { Categories } from "#/constants/categories";
import type { ImportedImageData } from "#/types/Image";
import type { People } from "#/types/People";
import {
  AtIcon,
  FacebookLogoIcon,
  IdentificationBadgeIcon,
  InstagramLogoIcon,
  LegoSmileyIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import type React from "react";
import { useState } from "react";
import InformationLine from "./InformationLine";
import { updateSelectedImage } from "#/functions/images";
import FilePeopleAddButton from "./FilePeopleAddButton";

type Props = {
  selectedImage: ImportedImageData;
  setImages: React.Dispatch<React.SetStateAction<ImportedImageData[]>>;
  selectedIndex: number;
  people: People[];
  peopleSearch: string;
  setPeopleSearch: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

export default function FilePeople({
  selectedImage,
  setImages,
  selectedIndex,
  people,
  peopleSearch,
  setPeopleSearch,
  className,
}: Props) {
  const [hoveredPersonId, setHoveredPersonId] = useState<number | null>(null);
  const hoveredPerson = people.find((person) => person.id === hoveredPersonId);

  const filteredPeople = people.filter((person) => {
    const matchesSearch = (
      person.facebook ||
      person.facebook_handle ||
      person.instagram
    )
      .toLowerCase()
      .includes(peopleSearch.toLowerCase());

    const isSelected = selectedImage.people.some(
      (selected) => selected.id === person.id,
    );

    return matchesSearch && !isSelected;
  });

  return (
    <div className="section-box">
      <div className="flex flex-row gap-4">
        <div className="w-[60%] flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div
              className={`field flex items-center gap-2 ${Categories[selectedImage.category - 1].focus_within} ${className}`}
            >
              <input
                placeholder="Search people..."
                value={peopleSearch}
                onChange={(event) => {
                  setPeopleSearch(event.target.value);
                }}
                className="flex-1 outline-none"
              />

              <button
                type="button"
                onClick={() => setPeopleSearch("")}
                className="cursor-pointer opacity-50 hover:text-red-400 hover:opacity-100 transition-all duration-100"
              >
                <XCircleIcon size={20} />
              </button>
            </div>

            <div className="max-h-[128px] overflow-y-scroll flex flex-wrap gap-2 pb-4">
              <FilePeopleAddButton
                setImages={setImages}
                selectedIndex={selectedIndex}
                peopleSearch={peopleSearch}
                unresolvedPeople={selectedImage.unresolvedPeople}
              />

              {selectedImage.people.map((person: People) => (
                <div
                  key={person.id}
                  onClick={() => {
                    updateSelectedImage(
                      "people",
                      selectedImage.people.filter(
                        (selectedPerson) => selectedPerson.id !== person.id,
                      ),
                      setImages,
                      selectedIndex,
                    );
                  }}
                  onMouseEnter={() => setHoveredPersonId(person.id)}
                  className={`button border text-white border-invisible ${Categories[selectedImage.category - 1].background} hover:border-gray-200 hover:bg-transparent hover:text-black hover:italic`}
                >
                  <p>{person.facebook || person.instagram}</p>
                </div>
              ))}

              {filteredPeople.map((person: People) => (
                <div
                  key={person.id}
                  onClick={() =>
                    updateSelectedImage(
                      "people",
                      [...selectedImage.people, person],
                      setImages,
                      selectedIndex,
                    )
                  }
                  onMouseEnter={() => setHoveredPersonId(person.id)}
                  className={`button border border-gray-200 hover:text-white ${Categories[selectedImage.category - 1].background_hover} hover:border-invisible`}
                >
                  <p>{person.facebook || person.instagram}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[40%] min-h-[256px] section-box h-full">
          <div className="flex flex-row gap-4 items-center justify-start mb-4">
            <IdentificationBadgeIcon size={28} weight="duotone" />
            <h1 className="text-xl font-semibold">Person information</h1>
          </div>
          {hoveredPerson ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <InformationLine label="Facebook" icon={FacebookLogoIcon}>
                  {hoveredPerson.facebook ? (
                    <p>{hoveredPerson.facebook}</p>
                  ) : (
                    <em className="opacity-50">None</em>
                  )}
                </InformationLine>

                <InformationLine label="Facebook handle" icon={AtIcon}>
                  {hoveredPerson.facebook_handle ? (
                    <p>{hoveredPerson.facebook_handle}</p>
                  ) : (
                    <em className="opacity-50">None</em>
                  )}
                </InformationLine>

                <InformationLine label="Instagram" icon={InstagramLogoIcon}>
                  {hoveredPerson.instagram ? (
                    <p>{hoveredPerson.instagram}</p>
                  ) : (
                    <em className="opacity-50">None</em>
                  )}
                </InformationLine>
              </div>

              <div>
                <em className="font-semibold opacity-50">
                  TODO: Add an image related to this person. Show 1-3 images.
                </em>
              </div>
            </div>
          ) : (
            <em className="opacity-50">
              Hover a name to reveal information...
            </em>
          )}
        </div>
      </div>
    </div>
  );
}
