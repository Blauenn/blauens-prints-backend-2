type Props = {
  id: string;
  list?: string;
  className?: string;
};

export default function Input({ id, list, className }: Props) {
  return (
    <input
      id={id}
      name={id}
      list={list}
      className={`border border-black bg-white ${className}`}
    />
  );
}
