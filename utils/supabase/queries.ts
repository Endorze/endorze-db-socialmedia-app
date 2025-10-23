import { createClient } from "./browser-client";
import { type QueryData } from "@supabase/supabase-js";

//we fetch the posts for main feed, and sort it by time.
export const getMainFeedPosts = async (supabase: ReturnType<typeof createClient>) => {
    const { data: { user } } = await supabase.auth.getUser();

    // 🧠 Hämta alla posts (oavsett användare)
    const { data, error } = await supabase
        .from("posts")
        .select(`
    id,
    title,
    content,
    slug,
    created_at,
    user_id,
    image,
    users:users!posts_user_id_fkey(username),
    likes(user_id),
    comments(id)
  `)
        .order("created_at", { ascending: false });

    if (error) throw error;

    //counts the likes on posts, and makes sure to take into account if an user has already liked a post
    const postsWithLikeData = data.map((post) => {
        const uniqueUserLikes = new Set(post.likes.map((l) => l.user_id));
        const hasLiked = user ? uniqueUserLikes.has(user.id) : false;

        return {
            ...post,
            likes_count: uniqueUserLikes.size,
            initialLiked: hasLiked,
        };
    });

    return { data: postsWithLikeData, error: null };
};

export type MainPostType = QueryData<ReturnType<typeof getMainFeedPosts>>;

export const getSinglePost = async (slug: string) => {
    const supabase = createClient();

    return await supabase
        .from("posts")
        .select(`
      id,
      title,
      content,
      slug,
      created_at,
      user_id,
      image,
      users:users!posts_user_id_fkey(username),
      likes(user_id)
    `)
        .eq("slug", slug)
        .single();
}

export const searchForPosts = async (searchTerm: string) => {
    const supabase = createClient();

    return await supabase.from("posts")
        .select("title, slug")
        .ilike("title", `${searchTerm}%`)
}

export const getCommentCount = async (postId: number) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("id", { count: "exact", head: true })
    .eq("post_id", postId);

  if (error) throw error;
  return data?.length ?? 0;
};
