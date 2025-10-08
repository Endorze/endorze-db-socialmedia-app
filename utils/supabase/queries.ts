import { createClient } from "./browser-client";
import { type QueryData } from "@supabase/supabase-js";

//we fetch the posts for main feed, and sort it by time.
export const getMainFeedPosts = async () => {
    const supabase = createClient();
    return await supabase.from("posts")
        .select("id, title, content, slug, created_at, user_id, users(username)")
        .order("created_at", { ascending: false })
}

export type MainPostType = QueryData<ReturnType<typeof getMainFeedPosts>>

export const getSinglePost = async (slug: string) => {
    const supabase = createClient();

    return await supabase.from("posts")
        .select("*, users(username)")
        .eq("slug", slug)
        .single()
}