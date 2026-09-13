type Props = {
  id: string;
  className?: string;
  rows?: number;
  cols?: number;
};

export default function TextArea({ id, className, rows, cols }: Props) {
  return (
    <textarea
      id={id}
      name={id}
      className={`border border-black bg-white ${className}`}
      rows={rows}
      cols={cols}
    ></textarea>
  );
}
