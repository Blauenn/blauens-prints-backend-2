import FileSelector from "#/components/routeBased/images/create/FileSelector";
import FileStaticInformation from "#/components/routeBased/images/create/FileStaticInformation";
import type { ImportedImageData } from "#/types/Image";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CaretLeftIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import FileKeywords from "#/components/routeBased/images/create/FileKeywords";
import FileImageThumbnailUrls from "#/components/routeBased/images/create/FileImageThumbnailUrls";
import FileCategory from "#/components/routeBased/images/create/FileCategory";
import { Categories } from "#/constants/categories";
import FilePeople from "#/components/routeBased/images/create/FilePeople";
import { getPeople, people } from "#/data/people";
import type { People } from "#/types/People";

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

  return (
    <div
      className={`p-8 h-full transition-all duration-300 ease-out ${selectedImage ? Categories[selectedImage.category - 1].background_soft : ""}`}
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
              <FileStaticInformation
                setImages={setImages}
                selectedImage={selectedImage}
                selectedIndex={selectedIndex}
              />

              <FileKeywords
                selectedImage={selectedImage}
                setImages={setImages}
                selectedIndex={selectedIndex}
              />

              <FilePeople
                selectedImage={selectedImage}
                setImages={setImages}
                selectedIndex={selectedIndex}
                people={peopleData}
                peopleSearch={peopleSearch}
                setPeopleSearch={setPeopleSearch}
              />

              <FileImageThumbnailUrls
                selectedImage={selectedImage}
                setImages={setImages}
                selectedIndex={selectedIndex}
              />

              <FileCategory
                selectedImage={selectedImage}
                setImages={setImages}
                selectedIndex={selectedIndex}
              />
            </div>
          </section>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
