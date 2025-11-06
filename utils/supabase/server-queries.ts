import { Result, UserType } from "@/types/types";
import { createClient } from "./server-client";

export const getLoggedInUser = async (): Promise<Result<UserType, "user">> => {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) return { error }
  if (!user) return { error: new Error("User not Logged in") }

  const { data, error: error2 } = await supabase.from("users")
    .select("username, id")
    .eq("id", user.id)
    .single()

  if (error2) return { error: error2 }

  return { user: data };
}