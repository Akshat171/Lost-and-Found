import React from "react";

const StatusDisplay = ({ status }) => {
  const getColor = (status) => {
    let color = "bg-slate-700";
    switch (status.toLowerCase()) {
      case "found":
        color = "bg-green-400 text-black";
        return color;
      case "lost":
        color = "bg-red-600 text-white";
        return color;
    }
    return color;
  };
  return (
    <span
      className={`inline-block rounded-full text-xs px-2 py-1 font-semibold text-gray-700 ${getColor(
        status
      )}`}
    >
      {status}
    </span>
  );
};

export default StatusDisplay;
