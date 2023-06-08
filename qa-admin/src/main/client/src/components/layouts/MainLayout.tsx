import {FC, ReactNode} from 'react';
import {Header} from "../Header";
import {Footer} from "../Footer";

interface MainLayoutProps{
    children:ReactNode
    isHeader?: boolean
    isFooter?: boolean
}

export const MainLayout: FC<MainLayoutProps> = ({children, isHeader = true, isFooter = true}) => {
    return (
        <div className={"text-contrast min-h-screen bg-secondary flex flex-col"}>
            {isHeader && <Header/> }
            <main className={`mx-5 flex-grow lg:container lg:mx-auto ${isHeader && "mt-4"}`}>
                {children}
            </main>
            {isFooter && <Footer/>}
        </div>
    );
}
