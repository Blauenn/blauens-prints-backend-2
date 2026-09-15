import Button from "#/components/buttons/Button";
import Label from "#/components/inputs/Label";
import Select from "#/components/inputs/Select";
import TextArea from "#/components/inputs/TextArea";
import FileSelector from "#/components/routeBased/images/Create/FileSelector";
import FileStaticInformation from "#/components/routeBased/images/Create/FileStaticInformation";
import { printPaper, printSizes } from "#/constants/prints";
import type { ImportedImageData } from "#/types/Image";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CaretLeftIcon } from "@phosphor-icons/react";
import { useState } from "react";

export const Route = createFileRoute("/images/Create")({
  component: RouteComponent,
});

function RouteComponent() {
  const categories = [
    { id: 1, name: "Wiwi", name_short: "Wiwi" },
    { id: 2, name: "Blauens Meisterwerk", name_short: "BM" },
    { id: 3, name: "Non-Blauens-Meisterwerk", name_short: "Non-BM" },
    { id: 4, name: "Random", name_short: "Random" },
    { id: 5, name: "Four-Legged Friends", name_short: "FLF" },
  ];

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

            <div className="bg-blue-100 mb-4">
              <h1>Information fields</h1>

              <div className="grid gap-4">
                <div className="bg-pink-100">
                  <Label htmlFor="categories">Categories</Label>
                  <Select id="categories" defaultValue="Blauens Meisterwerk">
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="bg-pink-100">
                  <h1>Print information</h1>
                  <Label htmlFor="print-size">Paper size</Label>
                  <Select id="print-size" defaultValue="4x6">
                    {printSizes.map((size) => (
                      <option key={size.value}>{size.label}</option>
                    ))}
                  </Select>

                  <Label htmlFor="print-paper">Type of paper</Label>
                  <Select id="print-paper" defaultValue="Satin">
                    {printPaper.map((paper) => (
                      <option key={paper.value}>{paper.label}</option>
                    ))}
                  </Select>
                </div>

                <div className="bg-pink-100">
                  <Label htmlFor="keywords">Keywords</Label>
                  <TextArea
                    id="keywords"
                    defaultValue={selectedImage.keywords.join("; ")}
                  />
                </div>
              </div>
            </div>
            <Button className="bg-pink-200">Submit</Button>
          </section>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
