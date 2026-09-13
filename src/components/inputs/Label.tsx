type Props = {
  htmlFor: string;
  label: string;
  className?: string;
};

export default function Label({ htmlFor, label, className }: Props) {
  return (
    <label htmlFor={htmlFor} className={`${className}`}>
      {label}
    </label>
  );
}
