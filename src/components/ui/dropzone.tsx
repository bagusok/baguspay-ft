import Image from "next/image";
import { useDropzone } from "react-dropzone";

export default function Dropzone({
  onDrop,
}: {
  onDrop: (acceptedFiles: File[]) => void;
}) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  return (
    <div
      className="w-full rounded-lg border min-h-24 max-h-40 inline-flex justify-center items-center"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive && acceptedFiles.length == 0 && <p>Drop the files here</p>}

      {acceptedFiles.length > 0 ? (
        <Image
          src={URL.createObjectURL(acceptedFiles[0])}
          alt="img"
          width={100}
          height={100}
          className="w-full max-h-40 rounded-md object-cover"
        />
      ) : (
        <p className="text-center">Drag files here</p>
      )}
    </div>
  );
}
