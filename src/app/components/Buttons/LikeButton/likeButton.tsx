"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToggleLike } from "../../../../../actions/toggleLike";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

export default function LikeButton({
    postId,
    initialLiked,
    likeCount,
}: {
    postId: number;
    initialLiked: boolean;
    likeCount: number;
}) {
    const [isLiked, setIsLiked] = useState(initialLiked);
    const [count, setCount] = useState(likeCount);

    const mutation = useMutation({
        mutationFn: async () => await ToggleLike(postId),
        onMutate: async () => {
            setIsLiked((prev) => !prev);
            setCount((prev) => (isLiked ? prev - 1 : prev + 1));
        },
        onError: () => {

            setIsLiked(initialLiked);
            setCount(likeCount);
        },
        onSuccess: (data) => {
            if (data?.liked !== isLiked) {
                setIsLiked(data.liked);
                setCount((prev) => (data.liked ? prev + 1 : prev - 1));
            }
        },
    });

    return (
        <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className={`flex items-center gap-2 ${isLiked ? "text-blue-500" : "text-gray-400"
                } hover:scale-110 transition-transform`}
        >
            <FontAwesomeIcon icon={faThumbsUp} className="text-lg" />
            <span>{count}</span>
        </button>
    );
}
