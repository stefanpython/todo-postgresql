import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET a specific todo
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    const userId = (session.user as { id: string }).id;

    // Check if the todo belongs to the authenticated user
    if (todo.userId !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Error fetching todo:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// PATCH (update) a specific todo
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Await the params to resolve it before using it
    const { id } = await params; // Ensure params is awaited

    // Get session data (assuming you're using some auth library like next-auth)
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: id, // Use the awaited id
      },
    });

    // If the todo doesn't exist
    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    // Extract userId from session
    const userId = (session.user as { id: string }).id;

    // Check if the todo belongs to the authenticated user
    if (todo.userId !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Parse request body (updated data for the todo)
    const data = await request.json();

    // Update the todo with the new data
    const updatedTodo = await prisma.todo.update({
      where: {
        id: id, // Use the awaited id
      },
      data,
    });

    // Return the updated todo object
    return NextResponse.json(updatedTodo);
  } catch (error) {
    // Log and handle errors
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// DELETE a specific todo
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    const userId = (session.user as { id: string }).id;

    // Check if the todo belongs to the authenticated user
    if (todo.userId !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Todo deleted" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
