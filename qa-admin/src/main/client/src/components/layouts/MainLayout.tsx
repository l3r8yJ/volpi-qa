import {FC, ReactNode} from 'react';
import {Header} from "../Header";

interface MainLayoutProps{
    children:ReactNode
    isHeader?: boolean
}

export const MainLayout: FC<MainLayoutProps> = ({children, isHeader = true}) => {
    return (
        <div className={"text-contrast min-h-screen bg-secondary"}>
            {isHeader && <Header/> }
            <main className={`mx-5 lg:container lg:mx-auto ${isHeader && "mt-4"}`}>
                {children}
            </main>
        </div>
    );
}
