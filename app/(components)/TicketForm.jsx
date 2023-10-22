// "use client";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import DropZone from "./DropZone";

// const TicketForm = ({ ticket }) => {
//   const EDITMODE = ticket._id === "new" ? false : true;
//   const router = useRouter();

//   const statingTicketData = {
//     title: "",
//     description: "",
//     location: "",
//     priority: 1,
//     progress: "0",
//     status: "Lost",
//     category: "Hardware Problem",
//   };

//   if (EDITMODE) {
//     statingTicketData["title"] = ticket.title;
//     statingTicketData["description"] = ticket.description;
//     statingTicketData["location"] = ticket.location;
//     statingTicketData["priority"] = ticket.priority;
//     statingTicketData["progress"] = ticket.progress;
//     statingTicketData["status"] = ticket.status;
//     statingTicketData["category"] = ticket.category;
//   }

//   const handleChange = (e) => {
//     const value = e.target.value;
//     const name = e.target.name;

//     setFormData((preState) => ({
//       ...preState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (EDITMODE) {
//       const res = await fetch(`/api/Tickets/${ticket._id}`, {
//         method: "PUT",
//         body: JSON.stringify({ formData }),
//         "content-type": "application/json",
//       });
//       if (!res.ok) {
//         throw new Error("Failed to update the Ticket");
//       }
//     } else {
//       const res = await fetch("/api/Tickets", {
//         method: "POST",
//         body: JSON.stringify({ formData }),
//         "content-type": "application/json",
//       });
//       if (!res.ok) {
//         throw new Error("Failed to create the Ticket");
//       }
//     }
//     router.refresh();
//     router.push("/");
//   };

//   const [formData, setFormData] = useState(statingTicketData);
//   return (
//     <div className="flex justify-center bg-page">
//       <form
//         className="flex flex-col gap-y-3 w-full md:w-1/2 "
//         method="post"
//         onSubmit={handleSubmit}
//       >
//         <h3>{EDITMODE ? "Update your Ticket" : "Create Your Ticket"}</h3>
//         <label>Title</label>
//         <input
//           id="title"
//           name="title"
//           type="text"
//           onChange={handleChange}
//           required={true}
//           value={formData.title}
//         />
//         <label>Description</label>
//         <textarea
//           id="description"
//           name="description"
//           type="text"
//           onChange={handleChange}
//           required={true}
//           value={formData.description}
//           rows={5}
//         />
//         <label>Location</label>
//         <textarea
//           id="location"
//           name="location"
//           type="text"
//           onChange={handleChange}
//           required={true}
//           value={formData.location}
//         />
//         <label>Upload file</label>
//         <DropZone className="p-16 mt-10 border border-neutral-200" />

//         <label>Category</label>
//         <select
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//         >
//           <option value="Hardware">Hardware</option>
//           <option value="Sport">Sport</option>
//           <option value="Jewelry">Jewelry </option>
//         </select>

//         <label>Priority</label>
//         <div>
//           <input
//             id="priority-1"
//             name="priority"
//             type="radio"
//             onChange={handleChange}
//             value={1}
//             checked={formData.priority == 1}
//           />
//           <label>1</label>
//           <input
//             id="priority-2"
//             name="priority"
//             type="radio"
//             onChange={handleChange}
//             value={2}
//             checked={formData.priority == 2}
//           />
//           <label>2</label>
//           <input
//             id="priority-3"
//             name="priority"
//             type="radio"
//             onChange={handleChange}
//             value={3}
//             checked={formData.priority == 3}
//           />
//           <label>3</label>
//           <input
//             id="priority-4"
//             name="priority"
//             type="radio"
//             onChange={handleChange}
//             value={4}
//             checked={formData.priority == 4}
//           />
//           <label>4</label>
//           <input
//             id="priority-5"
//             name="priority"
//             type="radio"
//             onChange={handleChange}
//             value={5}
//             checked={formData.priority == 5}
//           />
//           <label>5</label>
//         </div>
//         <label>Progress</label>
//         <input
//           type="range"
//           id="progress"
//           name="progress"
//           value={formData.progress}
//           min="0"
//           max="100"
//           onChange={handleChange}
//         />
//         <label>Status</label>
//         <select name="status" value={formData.status} onChange={handleChange}>
//           <option value="lost">Lost</option>
//           <option value="found">Found</option>
//         </select>

//         <input
//           type="submit"
//           className="btn"
//           value={EDITMODE ? "Update Ticket" : "Create  Ticket"}
//         />
//       </form>
//     </div>
//   );
// };

// export default TicketForm;

"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EditTicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();
  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "Lost",
    category: "Hardware Problem",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
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

  const categories = [
    "Hardware Problem",
    "Software Problem",
    "Application Deveopment",
    "Project",
  ];

  return (
    <div className=" flex justify-center">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
      >
        <h3>{EDITMODE ? "Update Your Ticket" : "Create New Ticket"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />
        <label>Category</label>
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

        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
        <input
          type="submit"
          className="btn max-w-xs"
          value={EDITMODE ? "Update Ticket" : "Create Ticket"}
        />
      </form>
    </div>
  );
};

export default EditTicketForm;
