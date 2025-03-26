"use client";

import { useTodo } from "@/contexts/TodoContext";
import { Loader2, Trash2, CheckCircle, Circle } from "lucide-react";

export function TodoList() {
  const { todos, isLoading, error, updateTodo, deleteTodo } = useTodo();

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  if (todos.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No todos yet. Add one above!
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between gap-x-6 py-5"
        >
          <div className="flex items-center gap-x-4">
            <button
              onClick={() =>
                updateTodo(todo.id, { completed: !todo.completed })
              }
              className="flex items-center"
            >
              {todo.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
            </button>
            <span
              className={`text-sm font-medium leading-6 ${
                todo.completed ? "text-gray-400 line-through" : "text-gray-900"
              }`}
            >
              {todo.title}
            </span>
          </div>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </li>
      ))}
    </ul>
  );
}
