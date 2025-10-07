import Avatar from "../Avatar/avatar"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type AuthorProps = {
    image: string,
    author: string,
    timeAgo: string,
}

const PostAuthor = (props: AuthorProps) => {
    return (
        <div className="flex gap-2 items-center">
            <Avatar />
            <p>{props.author}</p>
            <p>
                {dayjs(props.timeAgo).fromNow()}
            </p>
        </div>
    )
}

export default PostAuthor;