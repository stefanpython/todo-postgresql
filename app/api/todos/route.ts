import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

// GET all todos for the authenticated user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const todos = await prisma.todo.findMany({
      where: {
        userId: (session.user as { id: string }).id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// POST a new todo
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title } = await request.json();

    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        userId: (session.user as { id: string }).id,
      },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
