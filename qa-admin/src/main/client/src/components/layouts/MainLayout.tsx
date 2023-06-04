import {FC, ReactNode} from 'react';
import {Header} from "../Header";

interface MainLayoutProps {
    children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({children}) => {
    return (
        <div className={"text-white min-h-screen bg-neutral-900"}>
            <Header/>
            <main className={"mx-5 lg:container lg:mx-auto mt-4"}>
                {children}
            </main>
        </div>
    );
}
