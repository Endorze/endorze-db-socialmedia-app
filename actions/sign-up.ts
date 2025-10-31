"use server";

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server-client";
import z from "zod";
import { signUpSchema } from "./schemas";

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
  const parsedData = signUpSchema.parse(userdata);
  const supabase = await createClient("SignUp");

  // 🧩 Normalisera användarnamnet till lowercase och trimma
  const normalizedUsername = parsedData.username.trim().toLowerCase();

  // 1️⃣ Kolla om användarnamn redan finns (case-insensitive)
  const { data: existingUsers, error: usernameCheckError } = await supabase
    .from("users")
    .select("id, username");

  if (usernameCheckError) {
    throw new Error("Failed to check username availability.");
  }

  // Kontrollera manuellt (case-insensitive jämförelse)
  const usernameTaken = existingUsers?.some(
    (u) => u.username.toLowerCase() === normalizedUsername
  );

  if (usernameTaken) {
    throw new Error("That username is already taken.");
  }

  // 2️⃣ Försök skapa konto i Supabase Auth
  const {
    data: { user },
    error: signUpError,
  } = await supabase.auth.signUp({
    email: parsedData.email,
    password: parsedData.password,
  });

  // 3️⃣ Hantera e-post som redan finns
  if (signUpError) {
    if (signUpError.message.includes("User already registered")) {
      throw new Error("A user with this email already exists.");
    }
    throw new Error(signUpError.message);
  }

  // 4️⃣ Lägg till användaren i users-tabellen
  if (user && user.email) {
    const { error: insertError } = await supabase
      .from("users")
      .insert([
        {
          id: user.id,
          email: user.email,
          username: normalizedUsername,
        },
      ]);

    if (insertError) {
      throw new Error("Could not save user data to database.");
    }
  }

  // 5️⃣ Allt gick bra
  redirect("/");
};
