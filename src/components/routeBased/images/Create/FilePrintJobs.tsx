import { Categories } from "#/constants/categories";
import { people } from "#/data/people";
import type { ImportedImageData } from "#/types/Image";
import type { People } from "#/types/People";
import type { PrintLab } from "#/types/Prints";
import {
  ArrowCounterClockwiseIcon,
  QuestionMarkIcon,
} from "@phosphor-icons/react";

type Props = {
  selectedImage: ImportedImageData;
  setImages: React.Dispatch<React.SetStateAction<ImportedImageData[]>>;
  selectedIndex: number;
  className?: string;
};

type DateFieldProps = {
  id: string;
  label: string;
  value: string | null;
  disabled: boolean;
  onChange: (value: string | null) => void;
  selectedImage: ImportedImageData;
};

function DateField({
  id,
  label,
  value,
  disabled,
  onChange,
  selectedImage,
}: DateFieldProps) {
  return (
    <div className="w-full min-w-0 flex-1 flex flex-col gap-2">
      <label className={`${disabled ? "opacity-25 italic" : ""}`} htmlFor={id}>
        {label}
      </label>

      <div className="border border-gray-200 px-4 py-2 rounded-xl flex flex-row gap-4">
        <button
          type="button"
          className={`border border-gray-200 rounded-full flex justify-center items-center p-2 
	      ${
          disabled
            ? `opacity-25 cursor-auto`
            : `${Categories[selectedImage.category - 1].background_hover} hover:text-white hover:border-invisible`
        }`}
          disabled={disabled || value === null}
          onClick={() => onChange(null)}
        >
          <ArrowCounterClockwiseIcon size={18} />
        </button>

        <input
          type="datetime-local"
          id={id}
          className={`min-w-0 flex-1 ${disabled ? "opacity-25" : ""}`}
          value={value ?? ""}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value || null)}
        />

        <button
          type="button"
          className={`border border-gray-200 rounded-full flex justify-center items-center p-2 
	      ${
          disabled
            ? `opacity-25 cursor-auto`
            : `${Categories[selectedImage.category - 1].background_hover} hover:text-white hover:border-invisible`
        }`}
          disabled={disabled}
          onClick={() => onChange("2023-01-01T12:00")}
        >
          <QuestionMarkIcon size={18} />
        </button>
      </div>
    </div>
  );
}

export default function FilePrintJobs({
  selectedImage,
  setImages,
  selectedIndex,
  className,
}: Props) {
  const printLabs: PrintLab[] = [
    { id: 1, name: "Milk tea Cosplay Shop" },
    { id: 2, name: "Hakune Cos" },
    { id: 3, name: "MuffinChoco" },
  ];

  const validPeople = selectedImage.people.filter((person: People) =>
    people.some((dbPerson: People) => dbPerson.id === person.id),
  );

  function togglePrintJob(personId: number) {
    setImages((current) =>
      current.map((image, index) => {
        if (index !== selectedIndex) return image;

        const exists = image.printJobs.some((job) => job.personId === personId);

        return {
          ...image,
          printJobs: exists
            ? image.printJobs.filter((job) => job.personId !== personId)
            : [
                ...image.printJobs,
                {
                  personId,
                  size: "4x6",
                  paperType: "Satin",
                  sentToLabAt: null,
                  recievedFromLabAt: null,
                  deliveredAt: null,
                },
              ],
        };
      }),
    );
  }

  function updatePrintJob(
    personId: number,
    field:
      | "printLabId"
      | "size"
      | "paperType"
      | "sentToLabAt"
      | "recievedFromLabAt"
      | "deliveredAt",
    value: number | string | null | undefined,
  ) {
    setImages((current) =>
      current.map((image, index) => {
        if (index !== selectedIndex) return image;

        return {
          ...image,
          printJobs: image.printJobs.map((job) => {
            if (job.personId !== personId) return job;

            const updatedJob = {
              ...job,
              [field]: value,
            };

            // Clearing the first milestone resets everything downstream.
            if (field === "sentToLabAt" && value == null) {
              updatedJob.recievedFromLabAt = null;
              updatedJob.deliveredAt = null;
            }

            // Clearing the second milestone resets delivery information.
            if (field === "recievedFromLabAt" && value == null) {
              updatedJob.deliveredAt = null;
            }

            return updatedJob;
          }),
        };
      }),
    );
  }
  return (
    <section className={`section-box ${className ?? ""}`}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Print jobs</h1>
        {selectedImage.people.length > 0 ? (
          <div className="w-full flex flex-wrap gap-4">
            {selectedImage.people.map((person: People) => {
              return (
                <div
                  key={person.id}
                  onClick={() => {
                    togglePrintJob(person.id);
                  }}
                  className={`button border border-gray-200 
		    ${
          selectedImage.printJobs.some((job) => job.personId === person.id)
            ? `${Categories[selectedImage.category - 1].background} text-white border-invisible hover:italic hover:bg-transparent hover:text-black hover:border-gray-200`
            : `${Categories[selectedImage.category - 1].background_hover} hover:text-white hover:border-invisible`
        }`}
                >
                  {person.facebook || person.instagram}
                </div>
              );
            })}
          </div>
        ) : null}

        {validPeople.length > 0 ? (
          validPeople.map((person: People) => {
            const printJob = selectedImage.printJobs.find(
              (job) => job.personId === person.id,
            );

            if (!printJob) return null;

            return (
              <div key={person.id} className="section-box flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-bold">
                    {person.facebook || person.instagram}
                  </h2>

                  <div className="flex flex-row flex-wrap gap-4">
                    <div className="w-full min-w-0 flex-1 flex flex-col gap-2">
                      <label htmlFor={`print-lab-${person.id}`}>
                        Print lab
                      </label>

                      <select
                        id={`print-lab-${person.id}`}
                        className="field"
                        value={printJob.printLabId ?? ""}
                        onChange={(event) =>
                          updatePrintJob(
                            person.id,
                            "printLabId",
                            event.target.value
                              ? Number(event.target.value)
                              : undefined,
                          )
                        }
                      >
                        {printLabs.map((printLab) => (
                          <option key={printLab.id} value={printLab.id}>
                            {printLab.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full min-w-0 flex-1 flex flex-col gap-2">
                      <label htmlFor={`paper-size-${person.id}`}>Size</label>

                      <select
                        id={`paper-size-${person.id}`}
                        className="field"
                        value={printJob.size}
                        onChange={(event) =>
                          updatePrintJob(person.id, "size", event.target.value)
                        }
                      >
                        <option value="4x6">4x6</option>
                        <option value="2x3">2x3</option>
                        <option value="A4">A4</option>
                        <option value="A3">A3</option>
                      </select>
                    </div>

                    <div className="w-full min-w-0 flex-1 flex flex-col gap-2">
                      <label htmlFor={`paper-type-${person.id}`}>
                        Paper type
                      </label>

                      <select
                        id={`paper-type-${person.id}`}
                        className="field"
                        value={printJob.paperType}
                        onChange={(event) =>
                          updatePrintJob(
                            person.id,
                            "paperType",
                            event.target.value,
                          )
                        }
                      >
                        <option value="Matte">Matte</option>
                        <option value="Satin">Satin</option>
                        <option value="Glossy">Glossy</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-row flex-wrap gap-4">
                    <DateField
                      id={`sent-to-lab-${person.id}`}
                      label="Sent to lab at"
                      value={printJob.sentToLabAt}
                      disabled={false}
                      onChange={(value) =>
                        updatePrintJob(person.id, "sentToLabAt", value)
                      }
                      selectedImage={selectedImage}
                    />

                    <DateField
                      id={`received-from-lab-${person.id}`}
                      label="Received from lab at"
                      value={printJob.recievedFromLabAt}
                      disabled={printJob.sentToLabAt === null}
                      onChange={(value) =>
                        updatePrintJob(person.id, "recievedFromLabAt", value)
                      }
                      selectedImage={selectedImage}
                    />

                    <DateField
                      id={`delivered-at-${person.id}`}
                      label="Delivered at"
                      value={printJob.deliveredAt}
                      disabled={printJob.recievedFromLabAt === null}
                      onChange={(value) =>
                        updatePrintJob(person.id, "deliveredAt", value)
                      }
                      selectedImage={selectedImage}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-md italic opacity-50">No print jobs</p>
        )}
      </div>
    </section>
  );
}
