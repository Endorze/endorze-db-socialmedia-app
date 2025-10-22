import Link from "next/link";
import PostAuthor from "../PostAuthor/postAuthor";
import PostActions from "../PostActions/postActions";
import CommentSection from "../CommentSection/commentSection";

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
    return (
        <div className="max-w-[500px] w-full mx-auto pb-4 mb-4">
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
            <PostActions postId={id} initialLiked={initialLiked} likeCount={likeCount} />
            <CommentSection postId={id}/>
        </div>
    );
};

export default Post;
