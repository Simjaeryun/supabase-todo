"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InputFormWithSupabase() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    ("use server");
    const supabase = createClient();
    const { data, error } = await supabase
      .from("todos")
      .insert([{ title, description, del_yn: "N" }]);
    if (error) {
      console.error(error);
    }

    setTitle("");
    setDescription("");
    router.refresh();
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
        value={title}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <input
        type="text"
        placeholder="Description"
        onChange={e => setDescription(e.target.value)}
        value={description}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Submit
      </button>
    </form>
  );
}
