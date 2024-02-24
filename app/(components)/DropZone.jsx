import React from "react";

const DropZone = () => {
  return (
    <div className="grid w-full max-w-xs items-center gap-1.5">
      <input
        className="flex w-full rounded-md border border-blue-300 border-input bg-white text-sm text-gray-400 file:border-0 file:bg-blue-accent file:text-white file:text-sm file:font-medium"
        type="file"
        id="picture"
      />
    </div>
  );
};

export default DropZone;
