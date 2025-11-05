"use server";

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server-client";
import z from "zod";
import { signUpSchema } from "./schemas";

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignUpResponse = { error?: string };

export async function SignUp(userdata: SignUpInput): Promise<SignUpResponse | void> {
  const parsedData = signUpSchema.parse(userdata);
  const supabase = await createClient("SignUp");

  const normalizedUsername = parsedData.username.trim().toLowerCase().replaceAll(/[^a-z]/, "")

  const { data: users, error: usernameCheckError } = await supabase
    .from("users")
    .select("username")
    .eq("username", normalizedUsername);

  if (usernameCheckError) {
    return { error: "Could not verify username availability." };
  }

  const usernameTaken = users.length > 0;
  if (usernameTaken) {
    return { error: "That username is already taken." };
  }

  const {
    data: { user },
    error: signUpError,
  } = await supabase.auth.signUp({
    email: parsedData.email,
    password: parsedData.password,
  });

  if (signUpError) {
    if (signUpError.message.includes("User already registered")) {
      return { error: "A user with this email already exists." };
    }
    return { error: signUpError.message };
  }

  if (user && user.email) {
    const { error: insertError } = await supabase.from("users").insert([
      { id: user.id, email: user.email, username: normalizedUsername },
    ]);
    if (insertError) {
      return { error: "Could not save user data to database." };
    }
  }

  if (user) {
    const { error: profileError } = await supabase.from("profile").insert([
      {
        user_id: user.id,
        description: null,
        avatar_url: null,
        banner_url: null,
      },
    ]);

    if (profileError) {
      console.error("Profile creation failed:", profileError);
    }
  }

  redirect("/");
}
