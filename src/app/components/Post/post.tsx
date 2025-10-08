import Link from "next/link";
import PostAuthor from "../PostAuthor/postAuthor";

type Props = {
    content: string | null,
    title: string,
    username: string,
    created_at: string,
    slugText: string,
}

const Post = ({ content, title, username, created_at, slugText }: Props) => {
    return (
        <Link href={`${slugText}`} className="max-w-[600px] w-full mx-auto">
            <div>
                <PostAuthor image="" author={username} timeAgo={created_at} title={title} />
                <div className="flex flex-col mb-4">
                    <div className="bg-red-400 opacity-30 min-h-[400px]" />
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