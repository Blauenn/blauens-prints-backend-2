import Button from "#/components/buttons/Button";
import Input from "#/components/inputs/Input";
import Label from "#/components/inputs/Label";
import Select from "#/components/inputs/Select";
import TextArea from "#/components/inputs/TextArea";
import FileDropzone from "#/components/routeBased/images/Create/FileDropzone";
import { printPaper, printSizes } from "#/constants/prints";
import { parseImage } from "#/functions/exif";
import type { ImportedImageData } from "#/types/Image";
import { createFileRoute, Link } from "@tanstack/react-router";
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

  const [images, setImages] = useState<ImportedImageData[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage = images[selectedIndex];

  async function handleFilesSelect(files: File[]) {
    const parsedImages = await Promise.all(
      files.map((file) => parseImage(file)),
    );

    setImages(parsedImages);
    setSelectedIndex(0);
  }

  return (
    <div className="p-8">
      <Link to="/" className="text-2xl font-bold">
        Return
      </Link>

      <section>
        <div className="bg-blue-100 mb-4">
          <h1>File dropzone</h1>
          <FileDropzone onFilesSelect={handleFilesSelect} />
        </div>
      </section>

      {images.length > 0 ? (
        <div>
          <section>
            <h1>File selector</h1>
            <Select
              value={selectedIndex}
              onChange={(event) => setSelectedIndex(Number(event.target.value))}
            >
              {images.length > 0 &&
                images.map((image, index) => (
                  <option key={index} value={index}>
                    {image.fileName}
                  </option>
                ))}
            </Select>
          </section>
          <section>
            <div className="bg-blue-100 mb-4">
              <h1>File static information</h1>

              <img
                src={URL.createObjectURL(selectedImage.file)}
                className="w-[256px]"
              />

              <div className="">
                <h1>{selectedImage.fileName}</h1>
                <h1>
                  {selectedImage.cameraName} {selectedImage.cameraModel} +{" "}
                  {selectedImage.lensModel}
                </h1>
              </div>

              <div>
                <div className="flex flex-row justify-between">
                  <h1>Resolution</h1>
                  <h1>
                    {selectedImage.width}x{selectedImage.height}
                  </h1>
                </div>
                <div className="flex flex-row justify-between">
                  <h1>ISO</h1>
                  <h1>{selectedImage.iso}</h1>
                </div>
                <div className="flex flex-row justify-between">
                  <h1>Aperture</h1>
                  <h1>f/{selectedImage.aperture}</h1>
                </div>
                <div className="flex flex-row justify-between">
                  <h1>Shutter</h1>
                  <h1>{selectedImage.exposureTime}</h1>
                </div>
                <div className="flex flex-row justify-between">
                  <h1>Focal length</h1>
                  <h1>{selectedImage.shotFocalLength}mm</h1>
                </div>
              </div>
            </div>
          </section>

          <section>
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
                  <datalist id="people-list">
                    {people.map((person) => (
                      <option
                        key={person.id}
                        value={
                          person.facebook ? person.facebook : person.instagram
                        }
                      />
                    ))}
                  </datalist>
                  <Label htmlFor="recipients">Recipients</Label>
                  <Input id="recipients" list="people-list" />
                  <div className="border border-black p-4"></div>
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
                  <TextArea id="keywords" />
                </div>
              </div>
            </div>
          </section>
          <Button className="bg-pink-200">Submit</Button>
        </div>
      ) : (
        <div>Nothing at all</div>
      )}
    </div>
  );
}
