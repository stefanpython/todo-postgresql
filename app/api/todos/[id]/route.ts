import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { UpdateTodoInput } from "@/types/todo";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const json = await request.json();
    const { title, completed } = json as UpdateTodoInput;

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(completed !== undefined ? { completed } : {}),
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await prisma.todo.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
