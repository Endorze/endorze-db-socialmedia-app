import PostAuthor from "../../PostAuthor/postAuthor";

type Props = {
  author: string;
  content: string;
  timeAgo: string;
};

const Comment = ({ author, content, timeAgo }: Props) => {
  return (
    <div className="border-l pl-3 text-sm">
      <p className="mb-1">
        <span className="font-semibold">{author}</span>: {content}
      </p>
      <PostAuthor image="" author={author} timeAgo={timeAgo} title="" slug="" />
    </div>
  );
};

export default Comment;
