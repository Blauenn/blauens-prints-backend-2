import type { ImportedImageData } from "#/types/Image";
import {
  CheckCircleIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import React, { useEffect, useState, type SetStateAction } from "react";
import { addPerson } from "#/data/people";

type Props = {
  setImages?: React.Dispatch<SetStateAction<ImportedImageData[]>>;
  selectedIndex?: number;
  setAddingPerson: React.Dispatch<SetStateAction<boolean>>;
  defaultValue: string;
  unresolvedPeople?: string[];
};

export default function FilePeopleAddButtonField({
  setImages,
  selectedIndex,
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

  async function handleAddPerson() {
    await addPerson({
      value: addingPersonValue,
      addingInstagram: isInstagram,
    });
  }

  return (
    <div
      className={`field flex items-center gap-4 border ${isInstagram ? "border-pink-400" : "border-blue-400"}`}
    >
      <div className="flex flex-row gap-2 items-center">
        <button
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
            className="button-icon hover:text-red-400"
          />
        </button>
        <button type="button" onClick={handleAddPerson} className="group">
          <CheckCircleIcon
            size={22}
            weight="duotone"
            className="button-icon hover:text-green-400"
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
            setIsInstagram(false);
          }}
          className="button-icon opacity-75 text-pink-400"
        />
      ) : (
        <FacebookLogoIcon
          size={22}
          weight="duotone"
          onClick={() => {
            setIsInstagram(true);
          }}
          className="button-icon opacity-75 text-blue-400"
        />
      )}
    </div>
  );
}
