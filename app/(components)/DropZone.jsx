import Image from "next/image";
import React, { useState, useCallback } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDropzone } from "react-dropzone";

function DropZone({ className }) {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [], //accepting any type of image
    },
  });

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  return (
    <form>
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here</p>
        ) : (
          <p className="text-nav">
            Drag & drop files here or click to select files
          </p>
        )}
      </div>
      <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b-2 pb-3">
        Accepted files
      </h3>
      <ul className="mt-6  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
        {files.map((file) => (
          <li key={file.name} className="relative h-32 rounded-md shadow-lg">
            <Image
              src={file.preview}
              alt={file.name}
              width={100}
              height={100}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
              className="h-full w-full object-contain rounded-md"
            />
            <button
              type="button"
              className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors "
              onClick={() => removeFile(file.name)}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="w-5 h-5 fill-white hover:fill-red-400 transition-colors"
              />
            </button>
            <p className="mt-2 text-neutral-500 text-[12px] font-medium">
              {file.name}
            </p>
          </li>
        ))}
      </ul>
    </form>
  );
}

export default DropZone;
