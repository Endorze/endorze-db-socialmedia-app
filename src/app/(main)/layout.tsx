import { QueryClientProvider } from "../../../providers/query-client-provider";
import Header from "../components/Header/header";


const MainLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (

        <QueryClientProvider>
            <Header />
            {children}
        </QueryClientProvider>
    );
}

export default MainLayout;