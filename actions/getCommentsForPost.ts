"use server";
import { createClient } from "../utils/supabase/server-client";

export const getCommentsForPost = async (postId: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select(`
      id,
      content,
      created_at,
      users:users!comments_user_id_fkey(username)
    `)
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching comments:", error);
    return [];
  }

  return data || [];
};
