"use server";

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server-client";
import z from "zod";
import { signUpSchema } from "./schemas";

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
    const parsedData = signUpSchema.parse(userdata);
    const supabase = await createClient("SignUp");

    const normalizedUsername = parsedData.username.trim().toLowerCase();
    const { data: existingUsers, error: usernameCheckError } = await supabase
        .from("users")
        .select("id, username");

    if (usernameCheckError) {
        throw new Error("Failed to check username availability.");
    }

    const usernameTaken = existingUsers?.some(
        (u) => u.username.toLowerCase() === normalizedUsername
    );

    if (usernameTaken) {
        throw new Error("That username is already taken.");
    }

    const {
        data: { user },
        error: signUpError,
    } = await supabase.auth.signUp({
        email: parsedData.email,
        password: parsedData.password,
    });

    if (signUpError) {
        if (signUpError.message.includes("User already registered")) {
            throw new Error("A user with this email already exists.");
        }
        throw new Error(signUpError.message);
    }

    if (user && user.email) {
        const { error: insertError } = await supabase
            .from("users")
            .insert([
                {
                    id: user.id,
                    email: user.email,
                    username: normalizedUsername,
                },
            ]);

        if (insertError) {
            throw new Error("Could not save user data to database.");
        }
    }

    redirect("/");
};
