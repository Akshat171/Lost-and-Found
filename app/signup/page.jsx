"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="relative min-h-screen signup-bg flex items-center justify-center  py-7 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover  ">
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Simply sign up!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Missing keys? Wallet? Register your lost items and browse found
              posts.
            </p>
          </div>

          <form className="mt-8 space-y-4" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="mt-8 content-center">
              <label className="text-sm font-bold text-gray-700 tracking-wide">
                Name
              </label>
              <div className="flex items-center">
                {" "}
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
                  className="w-full text-black content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="username"
                  type="text"
                  autoComplete="off"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  placeholder="username"
                />
              </div>
            </div>
            <div className="relative">
              <label className="text-sm font-bold text-gray-700 tracking-wide">
                Email
              </label>
              <div className="flex items-center">
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
                  className=" w-full text-black text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="email"
                  type="email"
                  autoComplete="off"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="email"
                />
              </div>
            </div>
            <div className="mt-8 content-center">
              <label className="text-sm font-bold text-gray-700 tracking-wide">
                Password
              </label>
              <div className="flex items-center">
                {" "}
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
                </svg>{" "}
                <input
                  className="w-full text-black content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
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
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm items-center ">
                <Link
                  href="/"
                  className="font-medium text-indigo-500 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={onSignup}
                className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide
                                font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer ease-in "
              >
                Sign up
              </button>
            </div>
            <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
              <span>Already have an account?</span>
              <Link
                href="/login"
                className="text-indigo-500 hover:text-indigo-500no-underline hover:underline hover:-translate-y-1 transition-all duration-500 cursor-pointer ease-in "
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
