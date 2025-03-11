"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getTodos() {
  return await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createTodo(formData: FormData) {
  const text = formData.get("text") as string;

  if (!text || text.trim() === "") {
    return {
      error: "Todo text is required",
    };
  }

  await prisma.todo.create({
    data: {
      text,
    },
  });

  revalidatePath("/");
  return { success: true };
}

export async function updateTodoStatus(id: number, completed: boolean) {
  await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  revalidatePath("/");
  return { success: true };
}

export async function deleteTodo(id: number) {
  await prisma.todo.delete({
    where: { id },
  });

  revalidatePath("/");
  return { success: true };
}
