"use server";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server-client";

export const Login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);
    throw new Error(error.message);
  }

  redirect("/");
};
