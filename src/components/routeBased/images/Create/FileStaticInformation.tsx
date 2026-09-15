import { formatShutterSpeed } from "#/functions/numbers";
import type { ImportedImageData } from "#/types/Image";
import {
  ApertureIcon,
  CaretDownIcon,
  CaretUpIcon,
  ClockCounterClockwiseIcon,
  ClockIcon,
  FrameCornersIcon,
  LightbulbIcon,
  LightningIcon,
  LightningSlashIcon,
  MountainsIcon,
  TimerIcon,
} from "@phosphor-icons/react";
import FileStaticInformationLine from "./FileStaticInformationLine";

type Props = {
  selectedImage: ImportedImageData;
  setImages: React.Dispatch<React.SetStateAction<ImportedImageData[]>>;
  selectedIndex: number;
};

export default function FileStaticInformation({
  selectedImage,
  setImages,
  selectedIndex,
}: Props) {
  const staticDisplayValues = [
    {
      icon: FrameCornersIcon,
      label: "Resolution",
      value: `${selectedImage.width}x${selectedImage.height}`,
    },
    {
      icon: MountainsIcon,
      label: "Focal length",
      value: `${selectedImage.shotFocalLength}mm`,
    },
    {
      icon: LightbulbIcon,
      label: "ISO",
      value: String(selectedImage.iso),
    },
    {
      icon: ApertureIcon,
      label: "Aperture",
      value: `f/${selectedImage.aperture}`,
    },
    {
      icon: TimerIcon,
      label: "Shutter",
      value: formatShutterSpeed(Number(selectedImage.exposureTime)) + "s",
    },
    {
      icon: selectedImage.flash ? LightningIcon : LightningSlashIcon,
      label: "Flash",
      value: selectedImage.flash ? "Fired" : "Did not fire",
    },
  ];

  const dateDifference =
    (selectedImage.newDate - selectedImage.dateTimeOriginal) / 3600000;

  function adjustDateTime(hours: number) {
    setImages((current) =>
      current.map((image, index) => {
        if (index !== selectedIndex) return image;

        if (hours === 0) {
          return {
            ...image,
            newDate: image.dateTimeOriginal,
          };
        }

        const newDate = new Date(image.newDate);
        newDate.setHours(newDate.getHours() + hours);

        return {
          ...image,
          newDate,
        };
      }),
    );
  }

  let horizontalImage = false;
  if (selectedImage?.width > selectedImage?.height) {
    horizontalImage = true;
  }

  return (
    <section>
      <div className="section-box flex flex-col md:flex-row gap-8 items-start mb-4">
        <img
          src={URL.createObjectURL(selectedImage.file)}
          className={`w-full ${horizontalImage ? "md:w-[352px]" : "md:w-[256px]"} rounded-xl shadow-md`}
        />

        <div className="flex flex-col gap-4 w-full">
          <div className="">
            <h1 className="text-2xl font-bold mb-2">
              {selectedImage.fileName}
            </h1>
            <p className="text-md opacity-50">
              {selectedImage.cameraName} · {selectedImage.cameraModel}
            </p>
            <p className="text-md opacity-50">{selectedImage.lensModel}</p>
          </div>

          <div className="flex flex-col gap-2 mb-2">
            <FileStaticInformationLine icon={ClockIcon} label="Digitized date">
              <div className="flex flex-row items-center gap-2">
                {dateDifference !== 0 ? (
                  dateDifference > 0 ? (
                    <h1 className={`font-semibold text-green-400`}>
                      (+{dateDifference}hr)
                    </h1>
                  ) : (
                    <h1 className={`font-semibold text-red-400`}>
                      ({dateDifference}hr)
                    </h1>
                  )
                ) : (
                  ""
                )}
                <h1 className="text-right">
                  {selectedImage.newDate?.toLocaleString()}
                </h1>
                <div className="flex flex-col items-center">
                  <CaretUpIcon
                    size={18}
                    weight="duotone"
                    className="hover:text-green-400 translate-y-1"
                    onClick={() => adjustDateTime(12)}
                  />
                  <ClockCounterClockwiseIcon
                    size={18}
                    weight="duotone"
                    className="hover:text-blue-400 "
                    onClick={() => {
                      adjustDateTime(0);
                    }}
                  />
                  <CaretDownIcon
                    size={18}
                    weight="duotone"
                    className="hover:text-red-400 -translate-y-1"
                    onClick={() => adjustDateTime(-12)}
                  />
                </div>
              </div>
            </FileStaticInformationLine>
            {staticDisplayValues.map((item) => (
              <FileStaticInformationLine
                icon={item.icon}
                key={item.label}
                label={item.label}
              >
                <h1>{item.value}</h1>
              </FileStaticInformationLine>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
