"use server";

import { prisma } from "@/lib/db";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validation
  if (!email || !password) {
    return {
      error: "Email and password are required",
    };
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      error: "User with this email already exists",
    };
  }

  // Hash password
  const hashedPassword = await hash(password, 10);

  // Create user
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Sign in the user
  await signIn("credentials", { email, password, redirect: false });

  // Redirect to the dashboard
  redirect("/");
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validation
  if (!email || !password) {
    return {
      error: "Email and password are required",
    };
  }

  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    console.error(error);
    return {
      error: "Invalid email or password",
    };
  }
}
