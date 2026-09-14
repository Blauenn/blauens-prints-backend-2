type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  children: React.ReactNode;
};

export default function Select({ children, id, className, ...props }: Props) {
  return (
    <select
      {...props}
      id={id}
      name={id}
      className={`border border-black bg-white ${className}`}
    >
      {children}
    </select>
  );
}
