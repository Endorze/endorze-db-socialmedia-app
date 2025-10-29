import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  onClick: () => void;
  commentCount: number;
};

export const CommentButton = ({ onClick, commentCount }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center cursor-pointer w-fit gap-1.5"
    >
      <FontAwesomeIcon icon={faComment} style={{ fontSize: "18px" }} />
      <span className="max-[500px]:hidden">
        {commentCount && commentCount > 0 ? `${commentCount} Comments` : "Comment" }
      </span>
    </button>
  );
};
