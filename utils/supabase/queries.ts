import { ArrayElement } from "@/types/types";
import { createClient } from "./browser-client";
import { type QueryData } from "@supabase/supabase-js";

export type ValueOrError<T> = {
  value: T,
  error?: null
} | {
  value?: null,
  error: Error
}

export type PostType = {
  likes_count: number;
  initialLiked: boolean;
  id: number;
  title: string;
  content: string | null;
  slug: string;
  created_at: string;
  user_id: string;
  image: string | null;
  users: {
    username: string;
  };
  likes: {
    user_id: string;
  }[];
  comments: {
    id: number;
  }[];
}

//we fetch the posts for main feed, and sort it by time.
export const getMainFeedPosts = async (supabase: ReturnType<typeof createClient>): Promise<ValueOrError<PostType[]>> => {
  const { data: { user } } = await supabase.auth.getUser();

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
  `) // count(likes(user_id)) as likes_count,
    .order("created_at", { ascending: false });

  if (error) return { error }

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

  return { value: postsWithLikeData }
};

export const getSinglePost = async (slug: string): Promise<ValueOrError<PostType>> => {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  const { data: post, error } = await supabase
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
    .eq("slug", slug)
    .single();

  if (error) return { error }

  //counts the likes on posts, and makes sure to take into account if an user has already liked a post

  const uniqueUserLikes = new Set(post.likes.map((l) => l.user_id));
  const hasLiked = user ? uniqueUserLikes.has(user.id) : false;
  const postsWithLikeData = {
    ...post,
    likes_count: uniqueUserLikes.size,
    initialLiked: hasLiked,
  };

  return { value: postsWithLikeData }
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
