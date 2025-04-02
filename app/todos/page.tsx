import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function TodosPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: (session.user as { id: string }).id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Todos</h1>
      <TodoForm />
      <TodoList initialTodos={todos} />
    </div>
  );
}
