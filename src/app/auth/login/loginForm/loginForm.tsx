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
        formState: { errors }} = useForm({
        resolver: zodResolver(loginSchema),
    })

    const {mutate, isPending, data, error} = useMutation({
        mutationFn: Login
    })

    return (
        <div>
            <form onSubmit={handleSubmit(values => mutate(values))} className="border-1 rounded-2xl p-4 flex flex-col w-lg mx-auto">
                <h2 className="font-bold text-3xl mb-4">Log in</h2>
                <fieldset className="flex flex-col">
                    <label htmlFor="email">Enter your E-mail</label>
                    <input className="mb-4 px-2" {...register("email")} type="text" id="main" placeholder="e-mail" />
                    {errors.email && <ErrorMessage message={errors.email.message!} />}
                </fieldset>
                <fieldset className="flex flex-col">
                    <label htmlFor="email">Enter your Password</label>
                    <input className="mb-4 px-2" {...register("password")} type="password" id="password" placeholder="password" />
                     {errors.email && <ErrorMessage message={errors.password?.message!} />}
                </fieldset>
                <button className="button-secondary w-[50%] cursor-pointer">{isPending? "Logging you in." : "Login"}</button>
                <div>
                    Don't have an account? Sign up <Link className="text-red-400" href={"/auth/signup"}>here!</Link>
                </div>
            </form>
            {data?.error && <ErrorMessage message={data.error} />}
        </div>
    )
}

export default LoginForm;