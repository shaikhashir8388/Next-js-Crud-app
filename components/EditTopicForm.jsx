"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, title, discription }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDiscription, setNewDiscription] = useState(discription);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, discription: newDiscription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={(e) => setNewDiscription(e.target.value)}
        value={newDiscription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Discription"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">Update topic</button>
    </form>
  );
}
