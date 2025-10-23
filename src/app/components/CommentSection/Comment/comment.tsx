import PostAuthor from "../../PostAuthor/postAuthor";

type Props = {
  author: string;
  content: string;
  timeAgo: string;
};

const Comment = ({ author, content, timeAgo }: Props) => {
  return (
    <div className="border-l pl-3 text-sm">
      <PostAuthor image="" author={author} timeAgo={timeAgo} title="" slug="" />
      <p className="px-12">
        {content}
      </p>
    </div>
  );
};

export default Comment;
