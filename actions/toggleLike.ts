"use server"
import z from "zod";
import { createClient } from "../utils/supabase/server-client";

export const ToggleLike = async (postId: number) => {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) {
        throw new Error("You must be logged in to like a post!")
    }

    const {data: existingLike, error: fetchError} = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .single();
}