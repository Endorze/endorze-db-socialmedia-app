import Avatar from "../Avatar/avatar"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

dayjs.extend(relativeTime);

type AuthorProps = {
    image: string,
    author: string,
    timeAgo: string,
    slug: string,
}

const PostAuthor = (props: AuthorProps) => {
    return (
        <div className="flex gap-2 pt-4 items-center">
            <Avatar />
            <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                    <p className="font-semibold text-sm">{props.author}</p>
                    <p className="text-sm">
                        {dayjs(props.timeAgo).fromNow()}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PostAuthor;