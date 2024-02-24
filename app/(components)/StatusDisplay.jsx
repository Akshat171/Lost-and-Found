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
    <h3 className="text-sm text-gray-500 pb-2">
      <span className={` py-1 px-2 text-white rounded-lg ${getColor(status)}`}>
        <span className="absolute inset-0"></span>
        {status}
      </span>
    </h3>
  );
};

export default StatusDisplay;
