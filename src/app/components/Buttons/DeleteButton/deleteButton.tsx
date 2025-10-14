"use client"
import { toast } from "sonner";
import { DeletePost } from "../../../../../actions/delete-post"
import { useMutation } from "@tanstack/react-query";

const DeleteButton = ({ postId }: { postId: number }) => {

    const {mutate, error} = useMutation({
        mutationFn: DeletePost, 
        onMutate: () => toast("Attempting to delete post..."),
        onSettled: () => toast.success("Post removed Successfully"),
    })

    return (
        <>
            <button onClick={() => mutate(postId)} className="p-2 border-1 cursor-pointer">Delete Post</button>
            <button onClick={() => toast.success("Post removed Successfully")} className="p-2 border-1 cursor-pointer">Toast</button>
        </>
    )
}

export default DeleteButton;