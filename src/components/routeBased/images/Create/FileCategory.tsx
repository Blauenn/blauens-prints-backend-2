import { Categories } from "#/constants/categories";
import { updateSelectedImage } from "#/functions/images";
import type { ImportedImageData } from "#/types/Image";
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";

type Props = {
  selectedImage: ImportedImageData;
  setImages: React.Dispatch<React.SetStateAction<ImportedImageData[]>>;
  selectedIndex: number;
  className?: string;
};

export default function FileCategory({
  selectedImage,
  setImages,
  selectedIndex,
  className,
}: Props) {
  function handleCategoryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const categoryId = Number(event.target.value);

    setImages((current) =>
      current.map((image, index) =>
        index === selectedIndex ? { ...image, category: categoryId } : image,
      ),
    );
  }

  return (
    <section className={`section-box flex gap-8 ${className}`}>
      <div className="basis-2/3 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Category</h1>
        <div className="flex flex-wrap gap-2">
          {Categories.map((category) => (
            <label
              key={category.id}
              className={`button border border-gray-200 hover:border-invisible hover:text-white
		  ${category.background_hover}
		  ${
        selectedImage.category === category.id
          ? `text-white border-invisible ${category.background}`
          : ""
      }`}
            >
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={selectedImage.category === category.id}
                onChange={handleCategoryChange}
                className="hidden"
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="basis-1/3 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">
          {Categories[selectedImage.category - 1].name}
        </h1>
        <div className="flex gap-4">
          <div className="flex-1 flex justify-between items-center gap-4 border border-gray-200 p-4 rounded-xl">
            <h2
              className={`text-6xl tracking-widest font-mono font-bold 
		  ${Categories[selectedImage.category - 1].color}`}
            >
              {selectedImage.number}
            </h2>
            <div className="translate-y-1 flex flex-col">
              <CaretUpIcon
                onClick={() =>
                  updateSelectedImage(
                    "number",
                    selectedImage.number + 1,
                    setImages,
                    selectedIndex,
                  )
                }
                size={36}
                weight="duotone"
                className={`opacity-50 hover:opacity-100 ${Categories[selectedImage.category - 1].color_hover} cursor-pointer transition-all duration-100`}
              />
              <CaretDownIcon
                onClick={() =>
                  updateSelectedImage(
                    "number",
                    selectedImage.number - 1,
                    setImages,
                    selectedIndex,
                  )
                }
                size={36}
                weight="duotone"
                className={`opacity-50 hover:opacity-100 -translate-y-2 ${Categories[selectedImage.category - 1].color_hover} cursor-pointer transition-all duration-100`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
