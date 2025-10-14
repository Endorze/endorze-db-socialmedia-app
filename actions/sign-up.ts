"use server"

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server-client"
import z from "zod";
import { signUpSchema } from "./schemas";

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
    const parsedData = signUpSchema.parse(userdata)

    const supabase = await createClient("SignUp");

    const { data: { user }, error } = await supabase.auth.signUp(parsedData);
    if (user && user.email) {
        const {data, error} = await supabase.from("users").insert([{id: user.id, email: user.email, username: userdata.username}])
    }

    if (error) throw error;

    redirect("/")
}