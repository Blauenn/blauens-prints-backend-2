type Props = React.LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ className, ...props }: Props) {
  return <label {...props} className={`${className ?? ""}`} />;
}
