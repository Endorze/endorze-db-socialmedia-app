import Avatar from "../Avatar/avatar"

type AuthorProps = {
    image?: string,
    author: string,
}

const PostAuthor = (props: AuthorProps) => {
    return (
        <div className="flex gap-2 items-center">
            <Avatar />
            <p>{props.author}</p>
        </div>
    )
}

export default PostAuthor;