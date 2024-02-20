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
    <FontAwesomeIcon
      icon={faX}
      onClick={deleteTicket}
      className="text-red-400 hover:cursor-pointer rounded-full p-3/4 border-red-500 border-2 hover:text-red-200"
    />
  );
};

export default DeleteBlock;
