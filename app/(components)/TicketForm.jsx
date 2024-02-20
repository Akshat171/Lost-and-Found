"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DropZone from "./DropZone";
import Nav from "./Nav";
const EditTicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();
  const startingTicketData = {
    title: "",
    description: "",
    location: "",
    name: "",
    contact: "",

    status: "Lost",
    category: "Gadget",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["location"] = ticket.location;
    startingTicketData["name"] = ticket.name;
    startingTicketData["contact"] = ticket.contact;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (!res.ok) {
        throw new Error("Failed to update ticket");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        //@ts-ignore
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create ticket");
      }
    }

    router.refresh();
    router.push("/");
  };

  const categories = ["Gadget", "Jewellery", "Sport", "stationary"];

  return (
    <>
      <Nav />
      <div className=" flex justify-center">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col gap-3 w-full md:w-1/2  border-2 border-black p-10 rounded-lg  "
        >
          <h3 className="text-black flex justify-center">
            {EDITMODE ? "Update Your Ticket" : "Create New Ticket"}
          </h3>
          <label className="text-black">Item Name</label>
          <input
            className="p-1 border text-black"
            autoComplete="off"
            id="title"
            name="title"
            type="text"
            onChange={handleChange}
            required={true}
            value={formData.title}
          />
          <label className="text-black">Description</label>
          <textarea
            id="description"
            name="description"
            autoComplete="off"
            onChange={handleChange}
            required={true}
            value={formData.description}
            rows="5"
            className="border text-black"
          />
          <label className="text-black">Location</label>
          <input
            className="p-1 border text-black"
            id="location"
            autoComplete="off"
            name="location"
            type="text"
            onChange={handleChange}
            required={true}
            value={formData.location}
          />
          <label className="text-black">Owner/Locator name</label>
          <input
            className="p-1 border text-black"
            id="name"
            autoComplete="off"
            name="name"
            type="text"
            onChange={handleChange}
            required={true}
            value={formData.name}
          />
          <label className="text-black">Contact No.</label>
          <input
            className="p-1 border text-black"
            id="contact"
            name="contact"
            type="tel"
            autoComplete="off"
            onChange={handleChange}
            required={true}
            value={formData.contact}
          />

          <label className="text-black">Picture</label>
          <DropZone className=" p-10 mt-6 text-black border border-neutral-400" />

          <label className="text-black">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-1 text-black border border-black"
          >
            {categories?.map((category, _index) => (
              <option key={_index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label className="text-black">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="p-1 text-black border border-black"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
          <input
            type="submit"
            className="btn max-w-full"
            value={EDITMODE ? "Update form" : "Submit form"}
          />
        </form>
      </div>
    </>
  );
};

export default EditTicketForm;
