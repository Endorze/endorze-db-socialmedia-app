import Link from "next/link";
import { SignUp } from "../../../../../actions/sign-up";

const SignUpForm = () => {
    return (
        <div>
            <form action={SignUp} className="border-1 rounded-2xl p-4 flex flex-col w-lg mx-auto">
                <h2 className="font-bold text-3xl mb-4">Sign up</h2>
                <fieldset className="flex flex-col">
                    <label htmlFor="email">Enter your E-mail</label>
                    <input className="mb-4 px-2" type="text" id="main" name="email" placeholder="e-mail" />
                </fieldset>
                  <fieldset className="flex flex-col">
                    <label htmlFor="username">Enter your Username</label>
                    <input className="mb-4 px-2" type="username" id="username" name="username" placeholder="username" />
                </fieldset>
                <fieldset className="flex flex-col">
                    <label htmlFor="email">Enter your Password</label>
                    <input className="mb-4 px-2" type="password" id="password" name="password" placeholder="password" />
                </fieldset>
                <button className="button-secondary w-[50%]">Create Account</button>
                <div>
                    Already have an account? Sign in <Link className="text-red-400" href={"/auth/login"}>here!</Link>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm;