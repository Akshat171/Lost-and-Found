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
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3 ">
        {" "}
        <div className="ml-auto">
          <DeleteBlock id={ticket._id} />
        </div>
      </div>
      <Link href={`/TicketPage/${ticket._id}`} style={{ display: "contents" }}>
        <h4 className="uppercase">{ticket.title}</h4>
        <hr className="h-px border-0 bg-page mb-2" />
        <p className="whitespace-pre-wrap ">{ticket.description}</p>
        <p className="whitespace-pre-wrap  mt-3  ">
          <span className="font-semibold">Location: </span>
          {ticket.location}
        </p>
        <p className="whitespace-pre-wrap  mt-3 ">
          <span className="font-semibold">Owner/Locator name:</span>{" "}
          {ticket.name}
        </p>
        <p className="whitespace-pre-wrap  mt-3 ">
          <span className="font-semibold">Contact:</span> {ticket.contact}
        </p>
        <div className="flex-grow"></div>
        <div className="flex mt-1 ">
          <div className="flex flex-col">
            <p className="text-xs my-1">
              <span className="font-semibold">Time:</span>{" "}
              {formatTimeStamp(ticket.createdAt)}
            </p>
          </div>
          <div className="ml-auto flex items-center">
            {" "}
            <StatusDisplay status={ticket.status} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TicketCard;
