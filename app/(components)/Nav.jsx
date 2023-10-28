"use client";
import { FaWpforms, FaHome, FaRegUserCircle } from "react-icons/fa";

import Link from "next/link";
import { useRouter } from "next/navigation";
const Nav = () => {
  const router = useRouter();

  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FaHome className="icon" />
        </Link>
        <Link href="/TicketPage/new">
          <FaWpforms className="icon" />
        </Link>
      </div>
      <div>
        <h2 className="text-default-text ">LOST & FOUND</h2>
      </div>
      <div className="items-center mt-2 mr-2 space-x-2">
        <Link href="/login">
          <FaRegUserCircle className="icon ml-2" />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
