"use server";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server-client";
import { loginSchema } from "./schemas";
import z from "zod"

export const Login = async (userdata: z.infer<typeof loginSchema>) => {
  const parsedData = loginSchema.parse(userdata)
  const supabase = await createClient("Login");
  const { data: { user }, error } = await supabase.auth.signInWithPassword(parsedData);

  if (error) {
    return { error: error.message }
  }

  redirect("/");
};
