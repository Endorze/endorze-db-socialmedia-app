import Link from "next/link";
import { Login } from "../../../../../actions/log-in";

const LoginForm = () => {
    return (
        <div>
            <form action={Login} className="border-1 rounded-2xl p-4 flex flex-col w-lg mx-auto">
                <h2 className="font-bold text-3xl mb-4">Log in</h2>
                <fieldset className="flex flex-col">
                    <label htmlFor="email">Enter your E-mail</label>
                    <input className="mb-4 px-2" type="text" id="main" name="email" placeholder="e-mail" />
                </fieldset>
                <fieldset className="flex flex-col">
                    <label htmlFor="email">Enter your Password</label>
                    <input className="mb-4 px-2" type="password" id="password" name="password" placeholder="password" />
                </fieldset>
                <button className="button-secondary w-[50%]">Login</button>
                <div>
                    Don't have an account? Sign up <Link className="text-red-400" href={"/auth/signup"}>here!</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;