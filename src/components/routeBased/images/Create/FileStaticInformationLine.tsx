import type { Icon } from "@phosphor-icons/react";

type InformationLineProps = {
  children: React.ReactNode;
  label: string;
  icon: Icon;
  className?: string;
};

export default function FileStaticInformationLine({
  children,
  label,
  icon: Icon,
  className,
}: InformationLineProps) {
  return (
    <div className={`flex flex-row justify-between ${className}`}>
      <div className="flex flex-row items-center gap-2 opacity-50">
        <Icon size={22} weight="duotone" />
        <h1 className="">{label}:</h1>
      </div>
      {children}
    </div>
  );
}
