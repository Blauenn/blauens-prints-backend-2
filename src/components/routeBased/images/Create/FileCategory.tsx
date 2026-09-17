import type { ImportedImageData } from "#/types/Image";

type Props = {
  selectedImage: ImportedImageData;
  setImages: React.Dispatch<React.SetStateAction<ImportedImageData[]>>;
  selectedIndex: number;
};

const categories = [
  { id: 1, name: "Wiwi", name_short: "Wiwi", color: "text-purple-400" },
  {
    id: 2,
    name: "Blauens Meisterwerk",
    name_short: "BM",
    color: "text-pink-400",
  },
  {
    id: 3,
    name: "Non-Blauens-Meisterwerk",
    name_short: "Non-BM",
    color: "text-green-400",
  },
  { id: 4, name: "Random", name_short: "Random", color: "text-blue-400" },
  {
    id: 5,
    name: "Four-Legged Friends",
    name_short: "FLF",
    color: "text-orange-400",
  },
];

export default function FileCategory({
  selectedImage,
  setImages,
  selectedIndex,
}: Props) {
  return (
    <div className="section-box">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl">Category</h1>
        <select
          className="text-xl md:text-3xl font-bold"
          value={
            categories.find(
              (category) => category.id === selectedImage.category,
            )?.name
          }
          onChange={(event) => {
            const category = categories.find(
              (category) => category.name === event.target.value,
            );

            setImages((current) =>
              current.map((image, index) =>
                index === selectedIndex
                  ? { ...image, category: category.id }
                  : image,
              ),
            );
          }}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
