import Input from "#/components/inputs/Input";
import Label from "#/components/inputs/Label";
import Select from "#/components/inputs/Select";
import TextArea from "#/components/inputs/TextArea";
import { printPaper, printSizes } from "#/constants/prints";
import { createFileRoute, Link } from "@tanstack/react-router";

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

  return (
    <div className="p-8">
      <Link to="/" className="text-2xl font-bold">
        Return
      </Link>

      <section>
        <div className="bg-blue-100 mb-4">
          <h1>File dropzone</h1>
          <input type="file" />
        </div>
      </section>

      <section>
        <div className="bg-blue-100 mb-4">
          <h1>File static information</h1>

          <img
            src="https://live.staticflickr.com/65535/55360516786_4ab7dbbce5_b.jpg"
            className="w-[256px]"
          />

          <div className="">
            <h1>UWU00871.ARW</h1>
            <h1>SONY ILCE-7M4 - FE 70-200mm F4 G OSS</h1>
          </div>

          <div>
            <div className="flex flex-row justify-between">
              <h1>Resolution</h1>
              <h1>6000x4000</h1>
            </div>
            <div className="flex flex-row justify-between">
              <h1>ISO</h1>
              <h1>100</h1>
            </div>
            <div className="flex flex-row justify-between">
              <h1>Aperture</h1>
              <h1>f/1.8</h1>
            </div>
            <div className="flex flex-row justify-between">
              <h1>Shutter</h1>
              <h1>1/200s</h1>
            </div>
            <div className="flex flex-row justify-between">
              <h1>Focal length</h1>
              <h1>35mm</h1>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-blue-100 mb-4">
          <h1>Information fields</h1>

          <div className="grid gap-4">
            <div className="bg-pink-100">
              <Label htmlFor="categories" label="Categories" />
              <Select id="categories">
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
                    value={person.facebook ? person.facebook : person.instagram}
                  />
                ))}
              </datalist>
              <Label htmlFor="recipients" label="Recipients" />
              <Input id="recipients" list="people-list" />
            </div>

            <div className="bg-pink-100">
              <h1>Print information</h1>
              <Label htmlFor="print-size" label="Paper size" />
              <Select id="print-size">
                {printSizes.map((size) => (
                  <option key={size.value}>{size.label}</option>
                ))}
              </Select>

              <Label htmlFor="print-paper" label="Type of paper" />
              <Select id="print-paper">
                {printPaper.map((paper) => (
                  <option key={paper.value}>{paper.label}</option>
                ))}
              </Select>
            </div>

            <div className="bg-pink-100">
              <Label htmlFor="keywords" label="Keywords" />
              <TextArea id="keywords" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
