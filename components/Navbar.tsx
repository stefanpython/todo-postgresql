import Link from "next/link";
import { SignInButton } from "./AuthButtons";

export function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                Todo App
              </Link>
            </div>
            <div className="ml-6 flex items-center space-x-4">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                Home
              </Link>
              <Link
                href="/todos"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                Todos
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <SignInButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
