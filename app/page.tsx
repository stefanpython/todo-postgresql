import { getTodos } from "./actions/todo";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
import { Nav } from "./components/nav";
import { auth } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const todos = await getTodos();

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav user={session?.user || null} />

      <main className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Todo App with PostgreSQL
        </h1>

        {session ? (
          <>
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
          </>
        ) : (
          <div className="text-center">
            <p className="mb-4">Please sign in to manage your todos.</p>
            <Link
              href="/login"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
            >
              Sign in
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
