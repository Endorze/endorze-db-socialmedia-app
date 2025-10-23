"use server";
import { createClient } from "../utils/supabase/server-client";

export const addComment = async ({
  postId,
  content,
}: {
  postId: number;
  content: string;
}) => {
  const supabase = await createClient();

  // Hämta inloggad användare
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("You must be logged in to comment.");

  // Lägg till kommentaren
  const { error } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      user_id: user.id,
      content,
    });

  if (error) {
    console.error("Error adding comment:", error);
    throw new Error(error.message);
  }

  return { success: true };
};
