import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Todo List
            </h1>
            <TodoForm />
            <div className="mt-8">
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
