const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div className="min-h-screen bg-[url('/login-bg.jpg')] bg-cover bg-center bg-fixed">

            {children}
        </div>
    );
};

export default AuthLayout;
