import type { ImportedImageData } from "#/types/Image";

type Props = {
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  images: ImportedImageData[];
};

export default function FileSelector({
  selectedIndex,
  setSelectedIndex,
  images,
}: Props) {
  return (
    <section>
      <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm mb-4">
        <h1 className="text-2xl font-bold mb-4">File selector</h1>
        <div className="max-h-[256px] overflow-y-auto grid grid-cols-3 md:max-h-[512px] md:grid-cols-4 gap-2">
          {images.map((image: ImportedImageData, index: number) => (
            <div
              onClick={() => setSelectedIndex(index)}
              key={index}
              className={`${selectedIndex == index ? "bg-pink-200 shadow-sm" : "bg-white"} h-[48px] flex flex-row items-center justify-between py-2 px-4 border border-gray-200 rounded-xl`}
            >
              <h1 className="truncate">{image.file.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
