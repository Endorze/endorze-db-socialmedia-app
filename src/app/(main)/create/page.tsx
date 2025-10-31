"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema } from "../../../../actions/schemas";
import { CreatePost } from "../../../../actions/create-post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorMessage from "@/app/components/ErrorMessage/errorMessage";
import z from "zod";
import { useRouter } from "next/navigation";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreatePage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 👈 bildförhandsvisning

  const schemaWithImage = createPostSchema
    .omit({ image: true })
    .extend({
      image: z.unknown().transform((value) => value as FileList).optional(),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className="min-h-[90%] flex flex-col justify-center p-4">
      <form
        onSubmit={handleSubmit((values) => {
          const imageForm = new FormData();
          if (values.image?.length)
            imageForm.append("image", values.image[0]);
          mutate({
            title: values.title,
            content: values.content,
            image: imageForm,
          });
        })}
        className="w-full max-w-lg border  border-gray-300 p-4 flex flex-col mx-auto"
      >
        <h2 className="font-bold text-3xl mb-4">What's on your mind?</h2>

        <div className="flex flex-col gap-4">
          <fieldset className="flex flex-col">
            <label htmlFor="title" className="font-semibold">
              Title
            </label>
            <input
              className="p-4 border outline-[#0077B5] bg-gray-200 border-gray-300 rounded-2xl"
              {...register("title")}
              type="text"
              id="title"
              placeholder="Post title..."
            />
          </fieldset>


          <fieldset className="flex flex-col">
            <label htmlFor="image" className="font-semibold mb-2">
              Upload media
            </label>

            <label
              htmlFor="image"
              className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-100 w-fit"
            >
              <FontAwesomeIcon
                icon={faPhotoFilm}
                style={{ fontSize: "18px" }}
              />
              <span>Select file</span>
            </label>

            <input
              type="file"
              id="image"
              {...register("image", {
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setPreviewUrl(imageUrl);
                  } else {
                    setPreviewUrl(null);
                  }
                },
              })}
              className="hidden"
            />

            {previewUrl && (
              <div className="mt-3">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-md border border-gray-300"
                />
              </div>
            )}

            {errors.image && (
              <ErrorMessage message={errors.image.message!} />
            )}
          </fieldset>

          <fieldset className="flex flex-col">
            <label htmlFor="content" className="font-semibold">
              Content
            </label>
            <textarea
              className="p-4 border outline-[#0077B5] bg-gray-200 border-gray-300 rounded-2xl"
              {...register("content")}
              id="content"
              placeholder="Start talking..."
            />
          </fieldset>
        </div>

        <button
          disabled={isPending}
          className="button-secondary w-[50%] cursor-pointer mt-4 rounded-md"
        >
          {isPending ? "Creating..." : "Create Post"}
        </button>

        {error && (
          <ErrorMessage message="Något gick fel när posten skulle skapas." />
        )}
      </form>
    </div>
  );
};

export default CreatePage;
