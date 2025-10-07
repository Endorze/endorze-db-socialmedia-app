import PostAuthor from "../PostAuthor/postAuthor";

type Props = {
    content: string | null,
    title: string,
    username: string,
    created_at: string,
}

const Post = ({content, title, username, created_at}: Props) => {
    return (
        <div className="flex flex-col">
            <PostAuthor image="" author={username} timeAgo={created_at}/>
            <h2 className="font-bold text-xl">{title}</h2>
            <p>{content}</p>
        </div>
    )
}

export default Post;