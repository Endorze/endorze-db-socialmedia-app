'use server'

import z from "zod"
import { createPostSchema } from "./schemas"
import { createClient } from "../utils/supabase/server-client";
import { slugify } from "../utils/supabase/slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "../utils/supabase/upload-image";

export const CreatePost = async (userdata: z.infer<typeof createPostSchema>) => {
  const parsedData = createPostSchema.parse(userdata);

  const imageFile = userdata.image?.get?.('image');
  if (!(imageFile instanceof File) && imageFile !== null && imageFile !== undefined) {
    throw new Error("Malformed image file");
  }

  const imagePublicUrl = imageFile ? await uploadImage(imageFile) : null;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authorized");

  const baseSlug = slugify(parsedData.title);
  let slug = baseSlug;

  //check for duplicate slugs and append "-2", "-3", etc.
  let counter = 1;
  while (true) {
    const { data: existingSlug } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (!existingSlug) break;
    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  const userId = user.id;

  const { error } = await supabase
    .from("posts")
    .insert([{
      user_id: userId,
      slug,
      title: parsedData.title,
      content: parsedData.content,
      image: imagePublicUrl,
    }])
    .throwOnError();

  if (error) throw error;

  revalidatePath("/");
  redirect(`/${slug}`);
};
