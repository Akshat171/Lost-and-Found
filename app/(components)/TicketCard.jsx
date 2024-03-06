import Link from "next/link";
import DeleteBlock from "./DeleteBlock";

import StatusDisplay from "./StatusDisplay";
import Image from "next/image";

const TicketCard = ({ ticket }) => {
  const formatTimeStamp = (timestamp) => {
    const option = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: "true",
    };
    const date = new Date(timestamp);
    const formateDate = date.toLocaleString("en-US", option);
    return formateDate;
  };
  return (
    <div className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200 p-2 m-2">
      <div className="flex mb-3 z-100">
        {" "}
        <div className="ml-auto cursor-pointer">
          <DeleteBlock id={ticket._id} />
        </div>
      </div>
      {/*
        <div className="relative w-full h-80 md:h-64 lg:h-44">
          <img
            src="https://cdn.pixabay.com/photo/2021/07/24/01/42/zebra-dove-6488440_960_720.jpg"
            alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
            className="w-full h-full object-center object-cover"
          />
        </div>
  */}
      <Link href={`/TicketPage/${ticket._id}`} style={{ display: "contents" }}>
        <div className="px-3 py-4 ">
          <h4 className="uppercase text-gray-900">{ticket.title}</h4>
          <hr className="h-px border-0 bg-black mb-2" />
          <p className="whitespace-pre-wrap text-gray-900">
            {ticket.description}
          </p>
          <p className="whitespace-pre-wrap  mt-3 text-gray-900 ">
            <span className="font-semibold">Location: </span>
            {ticket.location}
          </p>
          <p className="whitespace-pre-wrap  mt-3 text-gray-900">
            <span className="font-semibold">Owner/Locator name:</span>{" "}
            {ticket.name}
          </p>
          <p className="whitespace-pre-wrap  mt-3 text-gray-900">
            <span className="font-semibold">Contact:</span> {ticket.contact}
          </p>
          <div className="flex-grow"></div>
          <div className="flex mt-1 text-gray-900">
            <div className="flex flex-col">
              <p className="text-xs my-1 text-gray-900">
                <span className="font-semibold">Time:</span>{" "}
                {formatTimeStamp(ticket.createdAt)}
              </p>
            </div>
            <div className="ml-auto flex items-center">
              {" "}
              <StatusDisplay status={ticket.status} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
