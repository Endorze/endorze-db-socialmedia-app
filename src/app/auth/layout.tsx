import Logo from "../components/Logo/logo";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <>
            <header className="flex justify-between items-center flex-wrap">
                <Logo />
            </header>
            <h2>Hello from Auth</h2>
            {children}
        </>
    )
}

export default AuthLayout;