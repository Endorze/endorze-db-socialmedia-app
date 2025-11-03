"use client"
import Link from "next/link";
import { Login } from "../../../../../actions/log-in";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../../../../../actions/schemas";
import ErrorMessage from "@/app/components/ErrorMessage/errorMessage";
import { useMutation } from "@tanstack/react-query";

const LoginForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors } } = useForm({
            resolver: zodResolver(loginSchema),
        })

    const { mutate, isPending, data, error } = useMutation({
        mutationFn: Login
    })

    return (
        <div className="min-h-screen flex flex-col justify-center p-4">
            <form
                onSubmit={handleSubmit(values => mutate(values))}
                className="w-full max-w-lg border bg-gray-200 border-gray-300 p-4 flex flex-col mx-auto"
            >

                <h2 className="font-bold text-3xl mb-4">Log in</h2>
                <fieldset className="flex flex-col">
                    <label htmlFor="email">Enter your E-mail</label>
                    <input className="p-4 border outline-[#0077B5] bg-gray-200 border-gray-300 rounded-2xl" {...register("email")} type="text" id="main" placeholder="e-mail" />
                    {errors.email && <ErrorMessage message={errors.email.message!} />}
                </fieldset>
                <fieldset className="flex flex-col">
                    <label htmlFor="email">Enter your Password</label>
                    <input className="mb-4 p-4 border outline-[#0077B5] border-gray-300 rounded-2xl" {...register("password")} type="password" id="password" placeholder="password" />
                    {errors.email && <ErrorMessage message={errors.password?.message!} />}
                </fieldset>
                <button className="bg-[#0077B5] p-4 rounded-2xl text-white font-semibold w-[50%] cursor-pointer mb-2">{isPending ? "Logging you in." : "Login"}</button>
                <div>
                    Don't have an account? Sign up <Link className="text-[#0077B5]" href={"/auth/signup"}>here!</Link>
                </div>
                {data?.error && <ErrorMessage message={data.error} />}
            </form>
        </div>
    )
}

export default LoginForm;