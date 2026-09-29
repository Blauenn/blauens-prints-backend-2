import type { Icon } from "@phosphor-icons/react";

type InformationLineProps = {
  children: React.ReactNode;
  label: string;
  icon: Icon;
  className?: string;
  iconClassName?: string;
};

export default function InformationLine({
  children,
  label,
  icon: Icon,
  className,
  iconClassName,
}: InformationLineProps) {
  return (
    <div className={`flex flex-row justify-between ${className}`}>
      <div className="flex flex-row items-center gap-3 opacity-50">
        <Icon size={22} weight="duotone" className={iconClassName} />
        <p className="">{label}</p>
      </div>
      {children}
    </div>
  );
}
