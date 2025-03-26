"use client";

import { useState } from "react";
import { useTodo } from "@/contexts/TodoContext";
import { Plus } from "lucide-react";

export function TodoForm() {
  const [title, setTitle] = useState("");
  const { createTodo } = useTodo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTodo({ title: title.trim() });
      setTitle("");
    } catch (error) {
      console.error("Error creating todo:", error);
      // Error is handled by the context
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-x-4 p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1 rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <Plus className="h-5 w-5" />
      </button>
    </form>
  );
}
