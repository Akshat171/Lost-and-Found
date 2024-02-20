"use client";
import { FaWpforms, FaHome, FaRegUserCircle } from "react-icons/fa";
import { BsMenuButtonWide } from "react-icons/bs";

import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
    <header className={`flex w-full items-center bg-black dark:bg-dark`}>
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <Link href="/" className="block w-full py-5">
              <img
                src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-primary.svg"
                alt="logo"
                className="dark:hidden"
              />
              <img
                src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-white.svg"
                alt="logo"
                className="hidden dark:block"
              />
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden border-none`}
              >
                <BsMenuButtonWide className="text-3xl" />
              </button>
              <nav
                // :className="!navbarOpen && 'hidden' "
                id="navbarCollapse"
                className={`absolute right-4 top-full w-full max-w-[250px] rounded-b-lg bg-black px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                  !open && "hidden"
                } `}
              >
                <ul className="block lg:flex">
                  <ListItem NavLink="/">Home</ListItem>
                  <ListItem NavLink="/TicketPage/new">Form</ListItem>
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              <button
                onClick={logout}
                className="px-7 py-3 text-base font-medium text-dark hover:text-primary dark:text-white"
              >
                Logout
              </button>

              <button
                href="/#"
                className="rounded-md bg-primary px-7 py-3 text-base font-medium text-white hover:bg-primary/90"
              >
                <FaRegUserCircle className="icon ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li>
        <Link
          href={NavLink}
          className="flex py-2 text-base  font-medium text-body-color hover:text-dark dark:text-dark-6  lg:ml-12 lg:inline-flex"
        >
          {children}
        </Link>
      </li>
    </>
  );
};
