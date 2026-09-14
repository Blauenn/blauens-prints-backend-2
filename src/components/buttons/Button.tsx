type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function Button({ children, onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={`border border-black rounded-xl py-4 px-8 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
