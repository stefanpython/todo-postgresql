"use client";

import { useRef } from "react";
import { createTodo } from "@/app/actions/todo";

export function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAddTodo(formData: FormData) {
    const result = await createTodo(formData);
    if (result.success) {
      formRef.current?.reset();
    }
  }

  return (
    <form ref={formRef} action={handleAddTodo} className="flex gap-2 mb-8">
      <input
        type="text"
        name="text"
        placeholder="Add a new todo..."
        className="flex-1 px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add
      </button>
    </form>
  );
}
