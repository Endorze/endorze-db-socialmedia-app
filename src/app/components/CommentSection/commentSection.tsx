import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCommentsForPost } from "../../../../actions/getCommentsForPost";
import Comment from "./Comment/comment";

const CommentSection = ({ postId }: { postId: number }) => {

  return (
    <div>
      commentsection
    </div>
  );
};

export default CommentSection