"use server";
import { CommentForPost } from "@/types/types";
import { createClient } from "../utils/supabase/server-client";

export const getRepliesForComments = async (commentId: number): Promise<CommentForPost[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select(`
      id,
      post_id,
      content,
      created_at,
      parent_id,
      user:users!comments_user_id_fkey(username)
    `)
    .eq("parent_id", commentId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching comments:", error);
    return [];
  }

  return data || [];
};
