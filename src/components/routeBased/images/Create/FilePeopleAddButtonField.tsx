import type { ImportedImageData } from "#/types/Image";
import {
  CheckCircleIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import React, { useEffect, useState, type SetStateAction } from "react";
import { addPerson, people } from "#/data/people";
import type { People } from "#/types/People";

type Props = {
  setImages: React.Dispatch<SetStateAction<ImportedImageData[]>>;
  selectedIndex: number;
  setPeople: React.Dispatch<SetStateAction<People[]>>;
  setAddingPerson: React.Dispatch<SetStateAction<boolean>>;
  defaultValue: string;
  unresolvedPeople?: string[];
};

export default function FilePeopleAddButtonField({
  setImages,
  selectedIndex,
  setPeople,
  setAddingPerson,
  defaultValue,
  unresolvedPeople,
}: Props) {
  const [isInstagram, setIsInstagram] = useState(false);

  useEffect(() => {
    // If the name value contains A-Z or a space...
    // it's most likely an Instagram handle.
    setIsInstagram(!/[A-Zก-ฮ ]/.test(defaultValue));
  }, [defaultValue]);

  const [addingPersonValue, setAddingPersonValue] = useState(defaultValue);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAddPerson() {
    const value = addingPersonValue.trim();

    if (!value || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const person = await addPerson({
        value,
        addingInstagram: isInstagram,
      });

      setPeople([...people]);

      if (setImages && selectedIndex !== undefined) {
        setImages((current) =>
          current.map((image, index) => {
            if (index !== selectedIndex) {
              return image;
            }

            const alreadySelected = image.people.some(
              (selected) => selected.id === person.id,
            );

            return {
              ...image,
              people: alreadySelected
                ? image.people
                : [...image.people, person],
              unresolvedPeople: image.unresolvedPeople.filter(
                (name) => name.trim().toLowerCase() !== value.toLowerCase(),
              ),
            };
          }),
        );
      }

      setAddingPerson(false);
    } catch (error) {
      console.error("Failed to add person:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className={`field flex items-center gap-4 border 
	  ${isSubmitting ? "border-gray-200" : isInstagram ? "border-pink-400" : "border-blue-400"}`}
    >
      <div className="flex flex-row gap-2 items-center">
        <button
          disabled={isSubmitting}
          type="button"
          onClick={() => {
            if (unresolvedPeople && setImages) {
              setImages((current) => {
                return current.map((image, index) =>
                  index === selectedIndex
                    ? {
                        ...image,
                        unresolvedPeople: image.unresolvedPeople.filter(
                          (person) => person !== defaultValue,
                        ),
                      }
                    : image,
                );
              });
            } else {
              setAddingPerson(false);
            }
          }}
          className="group"
        >
          <XCircleIcon
            size={22}
            weight="duotone"
            className={`${isSubmitting ? "opacity-10 hover:opacity-10 cursor-auto" : "hover:text-red-400"} button-icon`}
          />
        </button>
        <button
          disabled={isSubmitting}
          type="button"
          onClick={handleAddPerson}
          className="group"
        >
          <CheckCircleIcon
            size={22}
            weight="duotone"
            className={`${isSubmitting ? "opacity-10 hover:opacity-10 cursor-auto" : "hover:text-green-400"} button-icon`}
          />
        </button>
      </div>

      <input
        autoFocus={!unresolvedPeople}
        type="text"
        placeholder="Adding person..."
        defaultValue={defaultValue}
        onChange={(event) => {
          setAddingPersonValue(event.target.value);
        }}
        className="flex-1 outline-none"
      />

      {isInstagram ? (
        <InstagramLogoIcon
          size={22}
          weight="duotone"
          onClick={() => {
            if (!isSubmitting) {
              setIsInstagram(false);
            }
          }}
          className={`button-icon ${isSubmitting ? "opacity-10 text-gray-200" : "opacity-75 text-pink-400"}`}
        />
      ) : (
        <FacebookLogoIcon
          size={22}
          weight="duotone"
          onClick={() => {
            if (!isSubmitting) {
              setIsInstagram(true);
            }
          }}
          className={`button-icon ${isSubmitting ? "opacity-10 text-gray-200" : "opacity-75 text-blue-400"}`}
        />
      )}
    </div>
  );
}
