"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

interface AuthContextProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
