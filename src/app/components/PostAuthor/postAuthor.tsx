import Avatar from "../Avatar/avatar"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

type AuthorProps = {
    image: string,
    author: string,
    timeAgo: string,
    title: string,
    slug: string,
}

const PostAuthor = (props: AuthorProps) => {
    return (
        <div className="flex gap-2 items-center">
            <Avatar />
            <div className="flex flex-col">
                <div className="flex gap-2">
                    <p>{props.author}</p>
                    <p>
                        {dayjs(props.timeAgo).fromNow()}
                    </p>
                </div>
                <Link href={`/${props.slug}`}>
                    <p className="font-bold text-xl hover:underline">{props.title}</p>
                </Link>
            </div>
        </div>
    )
}

export default PostAuthor;