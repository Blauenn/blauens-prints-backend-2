type Props = {
  children: React.ReactNode;
  id: string;
  className?: string;
};

export default function Select({ children, id, className }: Props) {
  return (
    <select
      id={id}
      name={id}
      className={`border border-black bg-white ${className}`}
    >
      {children}
    </select>
  );
}
