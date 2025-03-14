"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function getTodos() {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  return await prisma.todo.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createTodo(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in to create a todo",
    };
  }

  const text = formData.get("text") as string;

  if (!text || text.trim() === "") {
    return {
      error: "Todo text is required",
    };
  }

  await prisma.todo.create({
    data: {
      text,
      userId: session.user.id,
    },
  });

  revalidatePath("/");
  return { success: true };
}

export async function updateTodoStatus(id: number, completed: boolean) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in to update a todo",
    };
  }

  // First check if the todo belongs to the user
  const todo = await prisma.todo.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!todo || todo.userId !== session.user.id) {
    return {
      error: "Todo not found or you do not have permission to update it",
    };
  }

  await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  revalidatePath("/");
  return { success: true };
}

export async function deleteTodo(id: number) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in to delete a todo",
    };
  }

  // First check if the todo belongs to the user
  const todo = await prisma.todo.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!todo || todo.userId !== session.user.id) {
    return {
      error: "Todo not found or you do not have permission to delete it",
    };
  }

  await prisma.todo.delete({
    where: { id },
  });

  revalidatePath("/");
  return { success: true };
}
