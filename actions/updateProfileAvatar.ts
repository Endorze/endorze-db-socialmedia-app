"use server"

import { createClient } from "../utils/supabase/server-client"

export async function updateProfileAvatar(newAvatarUrl: string) {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return { error: "User not found while updating avatar" }
    }
    
    const { error: updateError } = await supabase
        .from("profile")
        .update({ avatar_url: newAvatarUrl })
        .eq("user_id", user.id)

    if (updateError) {
        return {
            error: "Failed to update avatar"
        }
    }
    return { success: true }
}