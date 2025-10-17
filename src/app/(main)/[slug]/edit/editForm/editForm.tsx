"use client"
import { useForm } from "react-hook-form";
import { Tables } from "../../../../../../utils/supabase/database.types";
import { useMutation } from "@tanstack/react-query";
import { EditPost } from "../../../../../../actions/edit-post";


const EditForm = ({ postId, currentPost, }: { postId: number, currentPost: Pick<Tables<"posts">, "title" | "content">; }) => {

    const { mutate, error } = useMutation({
        mutationFn: EditPost
    })

    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: currentPost.title,
            content: currentPost.content
        }
    })

    return (
        <form onSubmit={handleSubmit(values => mutate({ postId, userdata: { title: values.title, content: values.content!}}))}>
            <fieldset>
                <label htmlFor="title">Post title</label>
                <input {...register("title")}></input>
            </fieldset>

            <fieldset>
                <label htmlFor="content">Let the world know...</label>
                <input {...register("content")}></input>
            </fieldset>
            
            <fieldset>
                <button className="button-tertiary">Update Post</button>
            </fieldset>
        </form>
    )
}

export default EditForm;