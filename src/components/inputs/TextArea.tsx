type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({ className, ...props }: Props) {
  return (
    <textarea
      {...props}
      className={`border border-black bg-white ${className ?? ""}`}
    />
  );
}
