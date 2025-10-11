"use server";

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server-client";

export const SignOut = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
  }

  // Viktigt: detta gör att cookies verkligen skrivs till response
  redirect("/auth/login");
};
