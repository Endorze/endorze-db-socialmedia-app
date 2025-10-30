"use client";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCommentsForPost } from "../../../../actions/getCommentsForPost";
import { addComment } from "../../../../actions/addComment";
import Comment from "./Comment/comment";
import Avatar from "../Avatar/avatar";

const CommentSection = ({ postId }: { postId: number }) => {
  const [newComment, setNewComment] = useState("");

  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsForPost(postId),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      await addComment({ postId, content: newComment });
    },
    onSuccess: () => {
      setNewComment("");
      refetch();
    },
  });

  if (isLoading) return <p className="text-center mt-4 text-gray-500 text-sm">Loading comments…</p>;

  return (
    <div className="mt-2 pt-2">
      <div className="flex gap-2 px-4">
        <Avatar />
        <div className="flex flex-col gap-2 border w-full border-gray-400 rounded-2xl px-3 py-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="text-sm outline-0"
          />
          {newComment && newComment.length > 0 && (

            <button
              onClick={() => {
                if (!newComment.trim()) return;
                mutation.mutate();
              }}
              disabled={mutation.isPending}
              className="bg-blue-600 w-fit font-semibold text-white self-end px-3 py-1 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {mutation.isPending ? "Posting..." : "Comment"}
            </button>
          )}
        </div>
      </div>
      {comments.length === 0 ? (
        <div className="w-full">
          {comments.length === 0 && newComment.length === 0 && (

          <p className="text-center p-5 text-gray-500 text-sm italic">No comments yet.</p>
          ) }
        </div>
      ) : (
        <div className="space-y-2 mb-3">
          {comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      )}

    </div>
  );
};

export default CommentSection;
