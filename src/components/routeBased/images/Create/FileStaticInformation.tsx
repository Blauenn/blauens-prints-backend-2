import { formatShutterSpeed } from "#/functions/numbers";
import type { ImportedImageData } from "#/types/Image";
import {
  ApertureIcon,
  ClockClockwiseIcon,
  ClockCounterClockwiseIcon,
  ClockIcon,
  FrameCornersIcon,
  LightbulbIcon,
  LightningIcon,
  LightningSlashIcon,
  MountainsIcon,
  TimerIcon,
  type Icon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";

type Props = {
  selectedImage: ImportedImageData;
};

type InformationLineProps = {
  label: string;
  value: string;
  icon: Icon;
  className?: string;
};

function FileStaticInformationLine({
  label,
  value,
  icon: Icon,
  className,
}: InformationLineProps) {
  return (
    <div className={`flex flex-row justify-between ${className}`}>
      <div className="flex flex-row items-center gap-2 opacity-50">
        <Icon size={22} weight="duotone" />
        <h1 className="">{label}:</h1>
      </div>
      <h1>{value}</h1>
    </div>
  );
}

export default function FileStaticInformation({ selectedImage }: Props) {
  const staticDisplayValues = [
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
    {
      icon: FrameCornersIcon,
      label: "Resolution",
      value: `${selectedImage.width}x${selectedImage.height}`,
    },
  ];

  const [displayDateTime, setDisplayDateTime] = useState<Date | null>(null);
  useEffect(() => {
    setDisplayDateTime(selectedImage?.dateTimeOriginal ?? null);
  }, [selectedImage]);

  const [dateShift, setDateShift] = useState(0);
  function adjustDateTime(hours: number) {
    setDateShift((current) => current + hours);

    setDisplayDateTime((current) => {
      if (!current) return null;

      const adjusted = new Date(current);
      adjusted.setHours(adjusted.getHours() + hours);

      return adjusted;
    });
  }

  let horizontalImage = false;
  if (selectedImage.width > selectedImage.height) {
    horizontalImage = true;
  }

  return (
    <section>
      <div className="flex flex-col md:flex-row gap-8 items-start shadow-sm bg-white border border-gray-200 p-4 rounded-xl mb-4">
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
              {selectedImage.cameraName} {selectedImage.cameraModel}
            </p>
            <p className="text-md opacity-50">{selectedImage.lensModel}</p>
          </div>

          <div className="flex flex-col gap-2 mb-2">
            {staticDisplayValues.map((item) => (
              <FileStaticInformationLine
                icon={item.icon}
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>

          <div className="border border-gray-200 p-4 md:flex md:flex-row md:justify-between rounded-xl">
            <div className={`flex flex-col gap-2`}>
              <div className="flex flex-row items-center gap-2 opacity-50">
                <ClockIcon size={20} weight="duotone" />
                <h1>Datetime digitized:</h1>
              </div>
              <h1 className="text-2xl font-bold">
                {displayDateTime?.toLocaleDateString()}
              </h1>
              <h1 className="text-2xl mb-4">
                {displayDateTime?.toLocaleTimeString()}{" "}
                {dateShift != 0 ? (
                  dateShift > 0 ? (
                    <span className="font-semibold text-green-400">
                      (+{dateShift}h)
                    </span>
                  ) : (
                    <span className="font-semibold text-red-400">
                      ({dateShift}h)
                    </span>
                  )
                ) : (
                  ""
                )}
              </h1>
            </div>
            <div className="md:w-[40%] grid grid-cols-3 md:grid-cols-1 gap-2">
              <button
                onClick={() => adjustDateTime(-12)}
                className="w-full flex flex-row items-center justify-center gap-2 shadow-md bg-red-300 py-2 px-4 rounded-xl"
              >
                <ClockCounterClockwiseIcon size={26} weight="duotone" />
                (12h)
              </button>
              <button
                onClick={() => {
                  setDisplayDateTime(selectedImage.dateTimeOriginal ?? null);
                  setDateShift(0);
                }}
                className="w-full shadow-md bg-gray-200
	  py-2 px-4 rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => adjustDateTime(12)}
                className="w-full flex flex-row items-center justify-center gap-2 shadow-md bg-green-300 py-2 px-4 rounded-xl"
              >
                <ClockClockwiseIcon size={26} weight="duotone" />
                (12h)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
