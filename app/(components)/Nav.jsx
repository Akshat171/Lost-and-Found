"use client";
import { FaWpforms, FaHome, FaRegUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Nav = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success");
      window.location.href = `/login`;
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="flex justify-between bg-black p-4">
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
      <div className="items-center mt-2 mr-2 space-x-2 flex flex-row">
        <button
          onClick={logout}
          className="p-2 bg-white text-black border border-black rounded top-0"
        >
          Logout
        </button>
        <Link href="/login">
          <FaRegUserCircle className="icon ml-2" />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
