"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DropZone from "./DropZone";

const EditTicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();
  const startingTicketData = {
    title: "",
    description: "",
    location: "",
    name: "",
    contact: "",
    priority: 1,
    status: "Lost",
    category: "Gadget",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["location"] = ticket.location;
    startingTicketData["name"] = ticket.name;
    startingTicketData["contact"] = ticket.contact;
    startingTicketData["priority"] = ticket.priority;
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

  const categories = ["gadget", "jewellery", "sport", "stationary"];

  return (
    <div className=" flex justify-center">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-full md:w-1/2  border border-nav p-10 rounded-none"
      >
        <h3 className="text-nav">
          {EDITMODE ? "Update Your Ticket" : "Create New Ticket"}
        </h3>
        <label className="text-nav">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label className="text-nav">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />
        <label className="text-nav">Location</label>
        <input
          id="location"
          name="location"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.location}
        />
        <label className="text-nav">Owner name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.name}
        />
        <label className="text-nav">Contact No.</label>
        <input
          id="contact"
          name="contact"
          type="number"
          onChange={handleChange}
          required={true}
          value={formData.contact}
        />

        <label className="text-nav">Image</label>
        <DropZone className=" p-10 mt-6 text-nav border border-neutral-400" />

        <label className="text-nav">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories?.map((category, _index) => (
            <option key={_index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label className="text-nav">Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
        <input
          type="submit"
          className="btn max-w-full"
          value={EDITMODE ? "Update Ticket" : "Create Ticket"}
        />
      </form>
    </div>
  );
};

export default EditTicketForm;
