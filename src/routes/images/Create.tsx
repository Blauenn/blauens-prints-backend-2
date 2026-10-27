import FileSelector from "#/components/routeBased/images/create/FileSelector";
import type { ImportedImageData } from "#/types/Image";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CaretLeftIcon, CloudArrowUpIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import FileKeywords from "#/components/routeBased/images/create/FileKeywords";
import FileImageThumbnailUrls from "#/components/routeBased/images/create/FileImageThumbnailUrls";
import FileCategory from "#/components/routeBased/images/create/FileCategory";
import { Categories } from "#/constants/categories";
import FilePeople from "#/components/routeBased/images/create/FilePeople";
import { getPeople, people } from "#/data/people";
import type { People } from "#/types/People";
import FilePrintJobs from "#/components/routeBased/images/create/FilePrintJobs";
import { uploadImage } from "#/data/images";
import FileTechnicalInformation from "#/components/routeBased/images/create/FileTechnicalInformation";

export const Route = createFileRoute("/images/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [peopleSearch, setPeopleSearch] = useState("");

  const [images, setImages] = useState<ImportedImageData[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  const [peopleData, setPeopleData] = useState<People[]>([]);

  useEffect(() => {
    async function loadPeople() {
      await getPeople();
      setPeopleData([...people]);
    }

    loadPeople();
  }, []);

  const [isUploading, setIsUploading] = useState(false);

  return (
    <div
      className={`p-8 h-full transition-all duration-500 ease-out ${selectedImage ? Categories[selectedImage.category - 1].background_soft : ""}`}
    >
      <Link to="/" className="text-2xl font-bold">
        <div className="flex flex-row items-center gap-2">
          <CaretLeftIcon size={32} weight="bold" />
          <h1 className="text-2xl font-bold">Return</h1>
        </div>
      </Link>

      <div className="grid gap-4 mt-8">
        <FileSelector
          images={images}
          setImages={setImages}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />

        {images.length > 0 ? (
          <section>
            <div className="grid gap-4">
              <FileCategory
                className="col-span-full"
                selectedImage={selectedImage}
                setImages={setImages}
                selectedIndex={selectedIndex}
              />

              <FilePrintJobs
                className="col-span-full"
                setImages={setImages}
                selectedIndex={selectedIndex}
                selectedImage={selectedImage}
              />

              <FileTechnicalInformation
                className="col-span-full"
                setImages={setImages}
                selectedImage={selectedImage}
                selectedIndex={selectedIndex}
              />

              <FilePeople
                className="col-span-full"
                selectedImage={selectedImage}
                setImages={setImages}
                selectedIndex={selectedIndex}
                people={peopleData}
                setPeople={setPeopleData}
                peopleSearch={peopleSearch}
                setPeopleSearch={setPeopleSearch}
              />

              <FileKeywords
                className="col-span-full"
                selectedImage={selectedImage}
                setImages={setImages}
                selectedIndex={selectedIndex}
              />

              <FileImageThumbnailUrls
                className="col-span-full"
                selectedImage={selectedImage}
                setImages={setImages}
                selectedIndex={selectedIndex}
              />

              <button
                type="button"
                onClick={async () => {
                  if (!selectedImage || isUploading) return;

                  setIsUploading(true);

                  try {
                    const result = await uploadImage(selectedImage);

                    setImages((current) =>
                      current.filter((_, index) => index !== selectedIndex),
                    );

                    console.log(result);
                  } catch (error) {
                    console.error("Failed to upload image:", error);
                  } finally {
                    setIsUploading(false);
                  }
                }}
                className={`button shadow-xl fixed bottom-6 right-6 z-50 rounded-full p-6 flex gap-4 border border-gray-200 bg-gray-200/50 hover:border-invisible group 
		    ${selectedImage ? Categories[selectedImage.category - 1].background_hover : ""}
		    ${isUploading ? `${Categories[selectedImage.category - 1].background} opacity-90 border-invisible cursor-auto` : ""}`}
              >
                <CloudArrowUpIcon
                  size={40}
                  weight="duotone"
                  className={`text-gray-500 
		      ${isUploading ? "text-white opacity-50" : "group-hover:text-white"}`}
                />
              </button>
            </div>
          </section>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
