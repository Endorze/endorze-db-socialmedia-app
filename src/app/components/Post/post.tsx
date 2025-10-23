"use client"
import Link from "next/link";
import PostAuthor from "../PostAuthor/postAuthor";
import PostActions from "../PostActions/postActions";
import CommentSection from "../CommentSection/commentSection";
import { useEffect, useState } from "react";
import { createClient } from "../../../../utils/supabase/browser-client";

type Props = {
    content: string | null;
    title: string;
    username: string;
    created_at: string;
    slugText: string;
    image?: string;
    initialLiked: boolean;
    id: number;
    likeCount: number;
};

const Post = ({
    content,
    title,
    username,
    created_at,
    slugText,
    image,
    initialLiked,
    id,
    likeCount,
}: Props) => {

    const [commentsVisible, setCommentsVisible] = useState(false);
      const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      const supabase = await createClient();
      const { count, error } = await supabase
        .from("comments")
        .select("*", { count: "exact", head: true })
        .eq("post_id", id);

      if (!error) setCommentCount(count ?? 0);
    };
    fetchCommentCount();
  }, [id]);


    return (
        <div className="max-w-[500px] w-full mx-auto pb-4 mb-4 bg-white rounded-2xl p-2">
            <div className="flex justify-between">
                <PostAuthor image="" author={username} timeAgo={created_at} title={title} slug={slugText} />
            </div>

            <div className="flex gap-2 mt-2">
                <p className="font-semibold">{username}:</p>
                <Link href={`/${slugText}`} className="hover:underline">
                    {content}
                </Link>
            </div>

            {image && (
                <Link href={`/${slugText}`}>
                    <img
                        src={image}
                        alt="Post image"
                        className="w-full h-auto max-h-[600px] object-cover rounded-md mt-2 cursor-pointer hover:opacity-90 transition"
                    />
                </Link>
            )}
            <PostActions postId={id} {...{commentsVisible, setCommentsVisible, initialLiked, likeCount, commentCount}} />
            {commentsVisible && <CommentSection postId={id}/>}
        </div>
    );
};

export default Post;
