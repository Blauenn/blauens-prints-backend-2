import { Categories } from "#/constants/categories";
import type { ImportedImageData } from "#/types/Image";

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
    <div className={`section-box ${className}`}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2">Category</h1>
        <div className="flex flex-wrap gap-2">
          {Categories.map((category) => (
            <label
              key={category.id}
              className={`button border border-gray-200 hover:border-invisible hover:text-white ${category.background_hover} ${selectedImage.category === category.id ? `text-white border-invisible ${category.background}` : ""} transition-all duration-100`}
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
    </div>
  );
}
