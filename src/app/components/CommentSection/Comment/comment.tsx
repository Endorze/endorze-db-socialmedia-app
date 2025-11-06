"use client";
import useCommentReplies from "@/hooks/useCommentReplies";
import { CommentForPost } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { addReply } from "../../../../../actions/addReply";
import PostAuthor from "../../PostAuthor/postAuthor";
import { ReplyButton } from "./reply";

type Props = {
  comment: CommentForPost
};

const Comment = ({ comment }: Props) => {
  const [toggleReplies, setToggleReplies] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);

  const { replies, isLoading, refetch } = useCommentReplies(comment.id, toggleReplies)

  const mutation = useMutation({
    mutationFn: async () =>
      await addReply({ postId: comment.post_id, content: replyText, commentId: comment.id }),
    onSuccess: () => {
      setReplyText("");
      setShowReplyInput(false);
      refetch();
    },
  });

  const handlePostReply = () => {
    if (!replyText.trim()) return;
    mutation.mutate();
  };

  return (
    <div className="border-l pl-3 text-sm">
      <PostAuthor userId={""} author={comment.user.username} timeAgo={comment.created_at} slug="" />
      <div className="px-12 flex flex-col gap-2">
        <p>{comment.content}</p>
        <ReplyButton
          onClick={() => {
            setToggleReplies((prev) => !prev);
            setShowReplyInput((prev) => !prev);
          }}
          replyCount={replies.length}
        />

      </div>

      {showReplyInput && (
        <div className="ml-10 mt-2 flex gap-2 items-center">
          <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="border rounded px-2 py-1 text-sm flex-1"
          />
          <button
            onClick={handlePostReply}
            disabled={mutation.isPending}
            className="text-blue-600 text-sm font-semibold"
          >
            {mutation.isPending ? "Posting..." : "Reply"}
          </button>
        </div>
      )}

      {toggleReplies && (
        <div className="ml-6 mt-2">
          <div className="space-y-2">
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
              />
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

export default Comment;
