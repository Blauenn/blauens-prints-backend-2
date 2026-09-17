import FileSelector from "#/components/routeBased/images/Create/FileSelector";
import FileStaticInformation from "#/components/routeBased/images/Create/FileStaticInformation";
import type { ImportedImageData } from "#/types/Image";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CaretLeftIcon } from "@phosphor-icons/react";
import { useState } from "react";
import FileKeywords from "#/components/routeBased/images/Create/FileKeywords";
import FileImageThumbnailUrls from "#/components/routeBased/images/Create/FileImageThumbnailUrls";
import FileCategory from "#/components/routeBased/images/Create/FileCategory";

export const Route = createFileRoute("/images/Create")({
  component: RouteComponent,
});

function RouteComponent() {
  const people = [
    { id: 1, facebook: "Mmantou", facebook_handle: "spr.ruk", instagram: "" },
    { id: 2, facebook: "Hirai Masako", facebook_handle: "", instagram: "" },
  ];

  const [search, setSearch] = useState("");

  const [images, setImages] = useState<ImportedImageData[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  return (
    <div className="p-8">
      <Link to="/" className="text-2xl font-bold">
        <div className="flex flex-row items-center gap-2">
          <CaretLeftIcon size={32} weight="bold" />
          <h1 className="text-2xl font-bold">Return</h1>
        </div>
      </Link>

      <div className="mt-8">
        <FileSelector
          images={images}
          setImages={setImages}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />

        {images.length > 0 ? (
          <section>
            <FileStaticInformation
              setImages={setImages}
              selectedImage={selectedImage}
              selectedIndex={selectedIndex}
            />

            <FileImageThumbnailUrls
              selectedImage={selectedImage}
              setImages={setImages}
              selectedIndex={selectedIndex}
            />

            <FileKeywords
              selectedImage={selectedImage}
              setImages={setImages}
              selectedIndex={selectedIndex}
            />

            <FileCategory
              selectedImage={selectedImage}
              setImages={setImages}
              selectedIndex={selectedIndex}
            />
          </section>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
