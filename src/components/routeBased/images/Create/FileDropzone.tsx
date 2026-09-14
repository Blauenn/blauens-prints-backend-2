import { useRef } from "react";

type Props = {
  onFilesSelect?: (files: File[]) => void;
  className?: string;
};

export default function FileDropzone({ onFilesSelect, className }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files) return;

    onFilesSelect?.(Array.from(files));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    handleFiles(event.target.files);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    handleFiles(event.dataTransfer.files);
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      className={`cursor-pointer border border-black ${className}`}
    >
      <p>Drop files here or you can click...</p>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
