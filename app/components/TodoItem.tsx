"use client";

import { updateTodoStatus, deleteTodo } from "@/app/actions/todo";

type TodoItemProps = {
  id: number;
  text: string;
  completed: boolean;
};

export function TodoItem({ id, text, completed }: TodoItemProps) {
  const handleDelete = async (id: number) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (isConfirmed) {
      try {
        await deleteTodo(id);
        alert("Todo deleted successfully!");
      } catch (error) {
        console.error("Error deleting todo:", error);
        alert("An error occurred while deleting the todo.");
      }
    }
  };
  return (
    <div className="flex items-center justify-between p-4 border rounded-md mb-2 bg-white">
      <div className="flex items-center gap-2 text-black">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => updateTodoStatus(id, e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className={completed ? "line-through text-black" : ""}>
          {text}
        </span>
      </div>
      <button
        onClick={() => handleDelete(id)}
        className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
        aria-label="Delete todo"
      >
        Delete
      </button>
    </div>
  );
}
