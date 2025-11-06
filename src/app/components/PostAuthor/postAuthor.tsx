import Avatar from "../Avatar/avatar"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

type AuthorProps = {
    author: string,
    timeAgo: string,
    slug: string,
    userId: string,
}

const PostAuthor = (props: AuthorProps) => {
    return (
        <Link href={`/ei/${props.author}`} className="flex gap-2 pt-4 items-center">
            <Avatar userId={props.userId}/>
            <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                    <p className="font-semibold text-sm">{props.author}</p>
                    <p className="text-sm">
                        {dayjs(props.timeAgo).fromNow()}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default PostAuthor;