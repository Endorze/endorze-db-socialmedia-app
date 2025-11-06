"use server"
import { QueryClientProvider } from "../../../providers/query-client-provider";
import Header from "../components/Header/header";


const MainLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div className="relative pt-16">
        <QueryClientProvider>
            <Header />
            {children}
        </QueryClientProvider>
        </div>
    );
}

export default MainLayout;