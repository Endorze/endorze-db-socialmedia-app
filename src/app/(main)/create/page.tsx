"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { createPostSchema } from "../../../../actions/schemas";
import { CreatePost } from "../../../../actions/create-post";
import { useMutation } from "@tanstack/react-query";

const CreatePage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors } } = useForm({
            resolver: zodResolver(createPostSchema),
        })

    const { mutate, isPending, error } = useMutation({
        mutationFn: CreatePost
    })

    return (
        <div>
            <form onSubmit={handleSubmit((values) => mutate(values))} className="border-1 rounded-2xl p-4 flex flex-col w-lg mx-auto">
                <h2 className="font-bold text-3xl mb-4">What's on your mind?</h2>

                <fieldset className="flex flex-col">
                    <label htmlFor="title">Title</label>
                    <input className="mb-4 px-2" {...register("title")} type="text" id="title" placeholder="Post title..." />
                </fieldset>

                <fieldset className="flex flex-col">
                    <label htmlFor="content">Content</label>
                    <textarea className="mb-4 px-2" {...register("content")} id="content" placeholder="Start talking..." />
                </fieldset>

                <button className="button-secondary w-[50%] cursor-pointer">Create Post</button>
            </form>

        </div>
    )
}

export default CreatePage;