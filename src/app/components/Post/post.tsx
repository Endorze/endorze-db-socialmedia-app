"use client"
import Link from "next/link";
import PostAuthor from "../PostAuthor/postAuthor";
import PostActions from "../PostActions/postActions";
import CommentSection from "../CommentSection/commentSection";
import { useEffect, useState } from "react";
import { createClient } from "../../../../utils/supabase/browser-client";
import { PostType } from "../../../../utils/supabase/queries";

type Props = {
    post: PostType
};

const Post = ({
    post
}: Props) => {

    const {
        content,
        title,
        users: { username },
        created_at,
        slug,
        image,
        initialLiked,
        id,
        likes_count,
        user_id,
    } = post
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
        <div className="max-w-[500px] w-full mx-auto pb-4 mb-4 bg-white md:rounded-lg border border-gray-200">
            <div className="flex flex-col justify-between px-4">
                <PostAuthor userId={user_id} author={username} timeAgo={created_at} slug={slug} />

                <Link href={`/${slug}`}>
                    <p className="text-lg font-medium">{title}</p>
                </Link>
                <Link href={`/${slug}`} className="text-gray-700 text-sm">
                    {content}
                </Link>
            </div>

            {image && (
                <Link href={`/${slug}`}>
                    {/\.(mp4|mov|webm|ogg)$/i.test(image) ? (
                        <video
                            src={image}
                            controls
                            className="w-full h-auto max-h-[600px] object-cover mt-2 cursor-pointer transition"
                        >
                            Din webbläsare stödjer inte videouppspelning.
                        </video>
                    ) : (
                        <img
                            src={image}
                            alt="Post media"
                            className="w-full h-auto max-h-[600px] object-cover mt-2 cursor-pointer hover:opacity-90 transition"
                        />
                    )}
                </Link>
            )}

            <PostActions postId={id} {...{ commentsVisible, setCommentsVisible, initialLiked, likes_count, commentCount }} />
            {commentsVisible && <CommentSection postId={id} />}
        </div>
    );
};

export default Post;
