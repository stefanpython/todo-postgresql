import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold mb-6">Welcome to Todo App</h1>

      {session ? (
        <div className="text-center">
          <p className="text-xl mb-6">
            Hello, {session.user?.name || "User"}! Ready to manage your tasks?
          </p>
          <Link
            href="/todos"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Go to My Todos
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl mb-6">Sign in to start managing your todos</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/signin"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-indigo-600 border border-indigo-600 hover:bg-indigo-50"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
