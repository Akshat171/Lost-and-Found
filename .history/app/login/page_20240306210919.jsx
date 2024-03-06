"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { BiLogIn } from "react-icons/bi";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Icon from "../../public/icon.png";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      // router.push("/");
      window.location.href = `/`;
    } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="h-screen  flex">
        <div
          className="hidden lg:flex w-full login_img_section lg:w-1/2 
          justify-around items-center"
        >
          <div
            className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
          ></div>
          <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
            <h1 className="text-white font-bold text-4xl font-sans">
              <Image
                src={Icon}
                width={50}
                height={50}
                alt="icon"
                className="bg-white rounded-full"
              />
              Campus Lost OR Found
            </h1>
            <p className="text-white mt-0.5 text-base">
              Lost something? Don't lose hope! We connect finders with owners.
            </p>
            {/*<div className="flex justify-center lg:justify-start mt-6">
              <Link
                href="/"
                className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
              >
                Get Started
              </Link>
            </div>
          */}
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 justify-center items-center  bg-gradient-to-r from-cyan-100 to-blue-200 space-y-8  md:bg-white ">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form className="bg-white rounded-md shadow-2xl p-5 text-black">
              <h1 className="text-gray-800 font-bold text-2xl mb-1">
                Welcome Back!
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-8">
                Please enter details here.
              </p>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  id="email"
                  className=" pl-2 text-black w-full outline-none border-none"
                  type="email"
                  autoComplete="off"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="email"
                />
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 text-black w-full outline-none border-none"
                  id="password"
                  type="password"
                  autoComplete="off"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="password"
                />
              </div>
              <button
                type="submit"
                onClick={onLogin}
                className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              >
                Login
              </button>
              <div className="flex justify-between mt-4">
                <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                  Forgot Password ?
                </span>

                <Link
                  href="/signup"
                  className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                >
                  Don't have an account yet?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
