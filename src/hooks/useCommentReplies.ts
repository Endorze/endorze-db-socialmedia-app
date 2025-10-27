import { CommentForPost } from "@/types/types";
import { getRepliesForComments } from "../../actions/getRepliesForComment";
import { useQuery } from "@tanstack/react-query";

type UseCommentReplies = {
  replies: CommentForPost[];
  isLoading: boolean;
  refetch: () => void
}

export default function useCommentReplies(commentId: number, enabled: boolean): UseCommentReplies {
    const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["replies", commentId],
    queryFn: () => getRepliesForComments(commentId),
    enabled: enabled,
  });

  return {
    replies: data,
    isLoading,
    refetch
  }
}