"use client"
import { useForm } from "react-hook-form";
import { Tables } from "../../../../../../utils/supabase/database.types";
import { useMutation } from "@tanstack/react-query";
import { EditPost } from "../../../../../../actions/edit-post";
import { createPostSchema } from "../../../../../../actions/schemas";
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

//we use this form to edit a posts title, image or content.
const EditForm = ({ postId, currentPost, }: { postId: number, currentPost: Pick<Tables<"posts">, "title" | "content" | "image">; }) => {

    const schemaWithImage = createPostSchema.omit({ image: true }).extend({ image: z.unknown().transform(value => { return value as (FileList) }).optional() })

    const { mutate, error } = useMutation({
        mutationFn: EditPost
    })

    const { register, handleSubmit } = useForm({
        resolver: zodResolver(schemaWithImage),
        defaultValues: {
            title: currentPost.title,
            content: currentPost.content || undefined,
            image: currentPost.image
        }
    })

    return (
        <form onSubmit={handleSubmit(values => {
            let imageForm = new FormData();

            if (values.image?.length && typeof values.image !== "string") {
                imageForm.append("image", values.image[0])
            }
            mutate({
                postId,
                userdata: {
                    title: values.title,
                    content: values.content!,
                    image: imageForm,
                },
            });
        })}
        >


            <fieldset>
                <label htmlFor="title">Post title</label>
                <input {...register("title")}></input>
            </fieldset>
            <fieldset>
                {currentPost.image && <img className="w-xl w-auto" src={currentPost.image} />}
                <label htmlFor="image">Upload new image</label>
                <input type="file" id="image" {...register("image")}></input>
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

export default EditForm
