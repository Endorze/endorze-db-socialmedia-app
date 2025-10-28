"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { DeletePost } from "../../../../../actions/delete-post"
import { useMutation } from "@tanstack/react-query";

const DeleteButton = ({ postId }: { postId: number }) => {

    const { mutate, error } = useMutation({
        mutationFn: DeletePost,
        onMutate: () => toast("Attempting to delete post..."),
        onSettled: () => toast.success("Post removed Successfully"),
    })

    return (
        <button onClick={() => mutate(postId)} className="button-tertiary px-4 py-2 w-fit cursor-pointer">
            <span><FontAwesomeIcon icon={faTrash} />
            </span>Delete Post</button>
    )
}

export default DeleteButton;