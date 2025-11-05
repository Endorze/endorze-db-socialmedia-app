"use server"

import { createClient } from "../utils/supabase/server-client"

export async function uploadProfileAvatar(file: File) {
    if (!file) return null;
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (!user) return null;

    const fileType = file.name.endsWith("png") ? "png"
        : file.name.endsWith("jpg") ? "jpg"
            : null;

    if (!fileType) return null;

    // TODO: Check file size and contents with third-party library, ensure the file is 
    // actually an image (and not a movie or zip bomb with terabytes of porn)

    //we generate a new unique avatar url
    console.log("file: ", file)
    const fileName = `${user.id}.avatar`

    //upload image to bucket storage
    const { data, error } = await supabase.storage.from("avatars-enddit").upload(fileName, file, {
        upsert: true
    })
    if (error) {
        console.error("Upload failed: ", error, data)
        return null;
    }

    const { data: publicUrlData } = supabase.storage.from("avatars-enddit").getPublicUrl(fileName);
    return publicUrlData.publicUrl;
}