"use client";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCommentsForPost } from "../../../../actions/getCommentsForPost";
import { addComment } from "../../../../actions/addComment";
import Comment from "./Comment/comment";

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

  if (isLoading) return <p className="text-gray-500 text-sm">Loading comments…</p>;

  return (
    <div className="mt-2 border-t pt-2">
      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm italic">No comments yet.</p>
      ) : (
        <div className="space-y-2 mb-3">
          {comments.map((c) => (
            <Comment
              key={c.id}
              author={c.users?.username ?? "Unknown"}
              content={c.content}
              timeAgo={c.created_at}
            />
          ))}
        </div>
      )}

      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 border rounded-md px-3 py-1 text-sm"
        />
        <button
          onClick={() => {
            if (!newComment.trim()) return;
            mutation.mutate();
          }}
          disabled={mutation.isPending}
          className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {mutation.isPending ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
