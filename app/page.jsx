"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import TicketCard from "./(components)/TicketCard";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const getTickets = async () => {
  try {
    const res = await fetch("/api/Tickets", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(res.json());
      }, 1000);
    });
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

const Dashboard = () => {
  // const [data, setData] = useState("none");
  const router = useRouter();
  const [tickets, setTickets] = React.useState();
  useEffect(() => {
    getTickets().then((data) => {
      setTickets(data.tickets);
    });
  }, []);

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success");
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const getUserDetails = async () => {
  //   const res = await axios.get("/api/users/me");
  //   console.log(res.data);
  //   setData(res.data.data._id)
  // };

  return (
    <div className="p-5">
      <button onClick={logout} className="p-2 bg-nav text-white rounded top-0">
        Logout
      </button>
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4 ">
              <h2 className="text-nav">{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4 ">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
