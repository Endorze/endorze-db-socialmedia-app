"use server";
import { createClient } from "../utils/supabase/server-client";

export const addReply = async ({
  postId,
  commentId,
  content,
}: {
  postId: number;
  commentId: number;
  content: string;
}) => {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("You must be logged in to comment.");
  if (!postId) throw new Error("postId is null");
  if (!commentId) throw new Error("commentId is null");

  const { error } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      user_id: user.id,
      parent_id: commentId,
      content,
    });

  if (error) {
    console.error("Error adding comment:", error);
    throw new Error(error.message);
  }

  return { success: true };
};
