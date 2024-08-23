"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");

  const router = useRouter(); // Make sure useRouter is only used client-side

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !discription) {
      alert("Title and description are required");
      return;
    }

    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, discription }),
      });

      if (res.ok) {
        router.push("/"); // Redirect to home page on success
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.error(error); // Log error in case of failure
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={(e) => setDiscription(e.target.value)}
        value={discription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Description"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Topic
      </button>
    </form>
  );
}
