"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
const DeleteBlock = ({ id }) => {
  const router = useRouter();
  const deleteTicket = async () => {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      window.location.href = window.location.href;
    }
  };
  return (
    <h3 className="text-sm text-gray-500 pb-2">
      <button
        className="py-1 px-2 text-black rounded-lg border-2 border-blue-500"
        onClick={deleteTicket}
      >
        Delete
      </button>
    </h3>
  );
};

export default DeleteBlock;
