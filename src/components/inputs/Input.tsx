type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: Props) {
  return (
    <input
      {...props}
      className={`border border-black bg-white ${className ?? ""}`}
    />
  );
}
