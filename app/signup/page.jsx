"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error) {
      console.log("Signup failed", error);
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
    <div className="text-black items-center mx-auto p-10">
      <div className="flex flex-col w-1/4">
        <h1 className="p-5">{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="username" className="px-2">
          username
        </label>
        <input
          className="p-1 space-x-2"
          type="text"
          id="username"
          placeholder="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label htmlFor="email" className="px-2">
          email
        </label>
        <input
          className="p-1 space-x-2"
          type="text"
          id="email"
          placeholder="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="password" className="px-2">
          password
        </label>
        <input
          className="p-1 space-x-2"
          type="password"
          id="password"
          placeholder="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button onClick={onSignup} className="p-3 bg-slate-400">
          {buttonDisabled ? "No signup" : "Signup"}
        </button>

        <Link href="/login">Visit Login page</Link>
      </div>
    </div>
  );
}
