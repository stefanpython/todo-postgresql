import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TodoProvider } from "@/contexts/TodoContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo application with PostgreSQL",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TodoProvider>{children}</TodoProvider>
      </body>
    </html>
  );
}
