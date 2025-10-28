"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { createPostSchema } from "../../../../actions/schemas";
import { CreatePost } from "../../../../actions/create-post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorMessage from "@/app/components/ErrorMessage/errorMessage";
import z from "zod"
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const schemaWithImage = createPostSchema.omit({ image: true }).extend({
    image: z.unknown().transform(value => value as FileList).optional()
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schemaWithImage),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: CreatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mainfeed-posts"] });
      router.push("/");
      router.refresh();
    },
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit(values => {
          const imageForm = new FormData();
          if (values.image?.length) imageForm.append("image", values.image[0]);
          mutate({ title: values.title, content: values.content, image: imageForm });
        })}
        className="border rounded-2xl p-4 flex flex-col w-lg mx-auto"
      >
        <h2 className="font-bold text-3xl mb-4">What's on your mind?</h2>

        <fieldset className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input className="mb-4 px-2" {...register("title")} type="text" id="title" placeholder="Post title..." />
        </fieldset>

        <fieldset>
          <label htmlFor="image">Upload an image</label>
          <input type="file" {...register("image")} id="image" />
          {errors.image && <ErrorMessage message={errors.image.message!} />}
        </fieldset>

        <fieldset className="flex flex-col">
          <label htmlFor="content">Content</label>
          <textarea className="mb-4 px-2" {...register("content")} id="content" placeholder="Start talking..." />
        </fieldset>

        <button disabled={isPending} className="button-secondary w-[50%] cursor-pointer">
          {isPending ? "Creating..." : "Create Post"}
        </button>

        {error && <ErrorMessage message="Något gick fel när posten skulle skapas." />}
      </form>
    </div>
  );
}
export default CreatePage;
