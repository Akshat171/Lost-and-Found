"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaRegUserCircle, FaTimes } from "react-icons/fa";
import Icon from "../../public/icon.png";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
const Navbar = () => {
  const [nav, setNav] = useState(false);

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
    <div className="flex justify-between items-center w-full h-20 p-4 text-white bg-black nav">
      <div>
        {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
        <h1 className="text-3xl  font-signature ml-2">
          <Link className="link-underline link-underline-black" href="/">
            <span className="flex gap-1 items-center">
              <div className="bg-white rounded-full p-1">
                <Image src={Icon} width={30} height={30} alt="nav-icon" />
              </div>
              Lost OR Found
            </span>{" "}
          </Link>
        </h1>
      </div>

      <div className="hidden md:flex">
        <div className=" px-4 cursor-pointer capitalize font-medium text-gray-400 hover:scale-105 hover:text-white duration-200 link-underline">
          <Link href="/">Home</Link>
        </div>
        <div className=" px-4 cursor-pointer capitalize font-medium text-gray-400 hover:scale-105 hover:text-white duration-200 link-underline">
          <Link href="/TicketPage/new">Form</Link>
        </div>
        <div className=" px-4 cursor-pointer capitalize font-medium text-gray-400 hover:scale-105 hover:text-white duration-200 link-underline ">
          <button onClick={logout}>Logout</button>
        </div>
        <div className=" px-4 cursor-pointer capitalize font-medium text-gray-400 hover:scale-105 hover:text-white duration-200 link-underline">
          <Link href="/">
            <FaRegUserCircle className="icon ml-2" />
          </Link>
        </div>
      </div>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col z-10 justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          <li className=" px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link href="/">Home</Link>
          </li>
          <li className=" px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link href="/TicketPage/new">Form</Link>
          </li>
          <li className=" px-4 cursor-pointer capitalize py-6 text-4xl">
            <button onClick={logout}>Logout</button>
          </li>
          <li className=" px-4 cursor-pointer capitalize py-6 text-4xl">
            <Link href="/">
              <FaRegUserCircle className="icon ml-2" />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
