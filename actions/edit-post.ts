'use server'
import z from "zod"
import { createPostSchema } from "./schemas";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { slugify } from "../utils/supabase/slugify";
import { createClient } from "../utils/supabase/server-client";


export const EditPost = async ({ postId, userdata }: { postId: number, userdata: z.infer<typeof createPostSchema> }) => {
    const parsedData = createPostSchema.parse(userdata);
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser();


    const { data: post, error } = await supabase.from("posts").select("*").eq("id", postId).single();
    console.log("User ID:", user?.id);
    console.log("Post:", post);

    if (!user || user.id !== post?.user_id) throw new Error("Not authorized");


    const { data: updatedPost } = await supabase.from("posts")
        .update({ ...parsedData, "slug": slugify(parsedData.title) })
        .eq("id", postId)
        .select("slug")
        .single()
        .throwOnError()

    if (error) throw error
    revalidatePath("/")
    redirect(`/${updatedPost?.slug}`);
}