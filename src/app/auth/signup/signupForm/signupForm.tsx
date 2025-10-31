"use client";
import Link from "next/link";
import { SignUp } from "../../../../../actions/sign-up";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../../../../actions/schemas";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/app/components/ErrorMessage/errorMessage";

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signUpSchema),
    });

    const { mutate, isPending, error } = useMutation({
        mutationFn: SignUp,
    });

    return (
        <div className="min-h-screen flex flex-col justify-center p-4">
            <form
                onSubmit={handleSubmit((values) => mutate(values))}
                className="w-full max-w-lg border border-gray-300 p-4 flex flex-col mx-auto"
            >
                <h2 className="font-bold text-3xl mb-4">Sign up</h2>

                <fieldset className="flex flex-col">
                    <label htmlFor="email">Enter your E-mail</label>
                    <input
                        className="mb-4 p-4 border outline-[#0077B5] border-gray-300 rounded-2xl"
                        {...register("email")}
                        type="text"
                        id="email"
                        placeholder="e-mail"
                    />
                    {errors.email && <ErrorMessage message={errors.email.message!} />}
                </fieldset>

                <fieldset className="flex flex-col">
                    <label htmlFor="username">Enter your Username</label>
                    <input
                        className="mb-4 p-4 border outline-[#0077B5] border-gray-300 rounded-2xl"
                        {...register("username")}
                        type="text"
                        id="username"
                        placeholder="username"
                    />
                    {errors.username && <ErrorMessage message={errors.username.message!} />}
                </fieldset>

                <fieldset className="flex flex-col">
                    <label htmlFor="password">Enter your Password</label>
                    <input
                        className="mb-4 p-4 border outline-[#0077B5] border-gray-300 rounded-2xl"
                        {...register("password")}
                        type="password"
                        id="password"
                        placeholder="password"
                    />
                    {errors.password && <ErrorMessage message={errors.password.message!} />}
                </fieldset>

                {error && (
                    <ErrorMessage message={(error as Error).message || "Something went wrong"} />
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-[#0077B5] p-4 rounded-2xl text-white font-semibold w-[50%] cursor-pointer mb-2 disabled:opacity-70"
                >
                    {isPending ? "Creating account..." : "Create Account"}
                </button>

                <div>
                    Already have an account? Sign in{" "}
                    <Link className="text-[#0077B5]" href={"/auth/login"}>
                        here!
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
