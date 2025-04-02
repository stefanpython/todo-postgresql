"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  initialTodos: Todo[];
}

export function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState(initialTodos);
  const router = useRouter();

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      router.refresh();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      router.refresh();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between py-2 border-b border-gray-200"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id, todo.completed)}
            />
            <label
              htmlFor={`todo-${todo.id}`}
              className={
                todo.completed ? "line-through text-gray-500" : "text-gray-700"
              }
            >
              {todo.title}
            </label>
          </div>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
