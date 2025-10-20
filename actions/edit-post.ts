'use server'
import z from "zod"
import { createPostSchema } from "./schemas";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { slugify } from "../utils/supabase/slugify";
import { createClient } from "../utils/supabase/server-client";
import { uploadImage } from "../utils/supabase/upload-image";

//
export const EditPost = async ({
    postId,
    userdata
}: {
    postId: number;
    userdata: z.infer<typeof createPostSchema>;
}) => {
    const parsedData = createPostSchema.parse(userdata);

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single();

    if (error) throw error;
    if (!user || user.id !== post?.user_id) throw new Error("Not authorized");

    const imageFile = userdata.image?.get?.("image");
    let publicImageUrl = post.image; // if the post already has an image, we save it.
    
    //only upload a new image if the file actually exists.
    if (imageFile instanceof File && imageFile.size > 0) {
        publicImageUrl = await uploadImage(imageFile);
    }

    const { data: updatedPost, error: updateError } = await supabase
        .from("posts")
        .update({
            title: parsedData.title,
            content: parsedData.content,
            image: publicImageUrl,
            slug: slugify(parsedData.title),
        })
        .eq("id", postId)
        .select("slug")
        .single()
        .throwOnError();

    if (updateError) throw updateError;

    revalidatePath("/");
    redirect(`/${updatedPost.slug}`);
};
