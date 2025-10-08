import Avatar from "../Avatar/avatar"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type AuthorProps = {
    image: string,
    author: string,
    timeAgo: string,
    title: string,
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
                <p className="font-bold text-xl">{props.title}</p>
            </div>
        </div>
    )
}

export default PostAuthor;