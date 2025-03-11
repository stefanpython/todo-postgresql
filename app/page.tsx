import { getTodos } from "./actions/todo";
import { TodoForm } from "@/app/components/TodoForm";
import { TodoItem } from "./components/TodoItem";

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Todo App with PostgreSQL
      </h1>
      <TodoForm />
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">
            No todos yet. Add one above!
          </p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
            />
          ))
        )}
      </div>
    </main>
  );
}
