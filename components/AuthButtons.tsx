"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export function SignInButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex items-center gap-4">
        {session.user.image ? (
          <Image
            src={session.user.image || "/placeholder.svg"}
            alt={session.user.name || "User"}
            className="h-8 w-8 rounded-full"
            width={32}
            height={32}
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            {session.user.name?.charAt(0) || "U"}
          </div>
        )}
        <span>{session.user.name}</span>
        <button
          onClick={() => signOut()}
          className="text-sm font-medium text-gray-700 hover:text-indigo-600"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => signIn()}
        className="text-sm font-medium text-gray-700 hover:text-indigo-600"
      >
        Sign In
      </button>
      <Link
        href="/auth/signup"
        className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Sign Up
      </Link>
    </div>
  );
}
