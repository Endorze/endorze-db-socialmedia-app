import Link from "next/link";
import PostAuthor from "../PostAuthor/postAuthor";

type Props = {
    content: string | null,
    title: string,
    username: string,
    created_at: string,
    slugText: string,
    image?: string,
}

const Post = ({ content, title, username, created_at, slugText, image }: Props) => {
    return (
        <Link href={`${slugText}`} className="max-w-[600px] w-full mx-auto">
            <div>
                <div className="flex justify-between">
                    <PostAuthor image="" author={username} timeAgo={created_at} title={title} />
                </div>
                <div className="flex flex-col mb-20">
                    {image && (
                        <img src={image} className="w-full h-[auto] max-h-[600px] object-cover" />
                    )}
                    <div className="flex gap-2">
                        <p>{username}:</p>
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Post;