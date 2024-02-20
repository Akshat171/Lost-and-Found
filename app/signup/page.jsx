"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Icon from "../../public/lost.png";
import Image from "next/image";
import { SiGnuprivacyguard } from "react-icons/si";

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
      <div className="container px-6 mx-auto">
        <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
          <div className="flex flex-col w-full">
            <div>
              <Image src={Icon} width={100} height={100} alt="icon" />
            </div>
            <h1 className="text-5xl text-gray-800 font-bold xs:text-xs">
              Simply sign up!
            </h1>
            <p className="w-8/12 pt-3 mx-auto md:mx-0 text-gray-500">
              Missing keys? Wallet? Register your lost items and browse found
              posts.
            </p>
          </div>
          <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
            <div className="bg-white p-7 flex flex-col w-full shadow-xl rounded-xl items-center">
              <h2 className="text-3xl md:text-3xl  font-bold text-gray-800 text-left mb-5">
                Signup
              </h2>
              <form action="" className="w-full">
                <div id="input" className="flex flex-col w-full my-2">
                  <label for="username" className="text-gray-500 mb-2">
                    Name
                  </label>
                  <input
                    id="username"
                    type="text"
                    autoComplete="off"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    placeholder="username"
                    className="appearance-none border-2 text-black border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  />
                </div>
                <div id="input" className="flex flex-col w-full my-2">
                  <label for="password" className="text-gray-500 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="off"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    placeholder="email"
                    className="appearance-none border-2 text-black border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  />
                </div>
                <div id="input" className="flex flex-col w-full my-2">
                  <label for="password" className="text-gray-500 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="off"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    placeholder="password"
                    className="appearance-none border-2 text-black border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                  />
                </div>
                <div id="button" className="flex flex-col w-full my-5">
                  <button
                    type="button"
                    onClick={onSignup}
                    className="w-full py-4 bg-green-600 rounded-lg text-green-100 hover:bg-green-800"
                  >
                    <div className="flex flex-row items-center justify-center">
                      <div className="font-bold flex float-row gap-1 items-center">
                        Signup
                        <div className="mr-2 text-lg">
                          {" "}
                          <SiGnuprivacyguard />
                        </div>
                      </div>
                      <div className="mr-2 text-xl"></div>
                    </div>
                  </button>
                  <div className="flex justify-evenly mt-5">
                    <Link
                      href="/login"
                      className="w-full text-center font-medium text-gray-500 "
                    >
                      Visit Login page
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
