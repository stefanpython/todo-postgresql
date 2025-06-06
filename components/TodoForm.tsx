"use client";

import type React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface TodoFormProps {
  onTodoAdded?: (newTodo: unknown) => void; // Callback function to update parent component
}

export function TodoForm({ onTodoAdded }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      // Get the newly created todo from the response
      const newTodo = await response.json();

      // Call the callback function with the new todo
      if (onTodoAdded) {
        onTodoAdded(newTodo);
      }

      setTitle("");
      router.refresh(); // Keep this for good measure
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  if (!session) {
    return (
      <div className="rounded-md bg-yellow-50 p-4 my-4">
        <p className="text-sm text-yellow-700">
          Please sign in to create todos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex justify-center">
      <div className="flex gap-2 max-w-[50em] mx-auto">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 rounded-md border-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 md:min-w-[50em]"
        />
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Add
        </button>
      </div>
    </form>
  );
}
