"use server"
import { createClient } from "../utils/supabase/server-client"
import { redirect } from "next/navigation";
import { createPostSchema } from "./schemas";
import z from "zod"
import { slugify } from "../utils/supabase/slugify";
import { revalidatePath } from "next/cache";
import { uploadImage } from "../utils/supabase/upload-image";

export const CreatePost = async (userdata: z.infer<typeof createPostSchema>) => {
    const parsedData = createPostSchema.parse(userdata);
    const slug = slugify(parsedData.title);

    const imageFile = userdata.image?.get("image");

    let publicImageUrl: string | null = null;

    if (imageFile instanceof File) {
        publicImageUrl = await uploadImage(imageFile);
    } else if (imageFile) {
        throw new Error("Malformed image file");
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not Authorized");
    }

    const userId = user.id;

    const { error } = await supabase
        .from("posts")
        .insert([{ 
            user_id: userId, 
            slug: slug, 
            ...parsedData, 
            image: publicImageUrl 
        }])
        .throwOnError();

    revalidatePath("/");
    redirect(`/${slug}`);
};
