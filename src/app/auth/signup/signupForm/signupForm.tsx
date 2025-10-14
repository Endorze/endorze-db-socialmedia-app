"use client"
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
        formState: { errors } } = useForm({
            resolver: zodResolver(signUpSchema)
        })

    const { mutate, isPending, error } = useMutation({
        mutationFn: SignUp
    })

    return (
        <div>
            <form onSubmit={handleSubmit(values => mutate(values))} className="border-1 rounded-2xl p-4 flex flex-col w-lg mx-auto">
                <h2 className="font-bold text-3xl mb-4">Sign up</h2>
                <fieldset className="flex flex-col">
                    <label htmlFor="email">Enter your E-mail</label>
                    <input className="mb-4 px-2" {...register("email")} type="text" id="main" placeholder="e-mail" />
                    {errors.email && <ErrorMessage message={errors.email.message!} />}
                </fieldset>
                <fieldset className="flex flex-col">
                    <label htmlFor="username">Enter your Username</label>
                    <input className="mb-4 px-2" {...register("username")} type="username" id="username" placeholder="username" />
                    {errors.username && <ErrorMessage message={errors.username?.message!} />}
                </fieldset>
                <fieldset className="flex flex-col">
                    <label htmlFor="email">Enter your Password</label>
                    <input className="mb-4 px-2" {...register("password")} type="password" id="password" placeholder="password" />
                    {errors.password && <ErrorMessage message={errors.password?.message!} />}
                </fieldset>
                <button className="button-secondary w-[50%] cursor-pointer">{isPending? "Creating account..." : "Create Account"}</button>
                <div>
                    Already have an account? Sign in <Link className="text-red-400" href={"/auth/login"}>here!</Link>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm;