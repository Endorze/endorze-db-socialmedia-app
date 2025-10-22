
"use server"

import { createClient } from "../utils/supabase/server-client"

export const getCommentsForPost = async (postId: number) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("comments")
    .select("id, content, created_at, users(username)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data
}
