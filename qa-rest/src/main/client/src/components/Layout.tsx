import {FC, ReactNode} from "react"
import {ChatHeader} from "./ChatHeader";
import {TextInputForm} from "./TextInputForm";

interface LayoutProps {
    children: ReactNode
}

export const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <div className={"rounded-lg overflow-hidden text-zinc-900 relative h-[600px] flex flex-col"}>
            <ChatHeader/>
            <div className={"flex-grow space-y-4 overflow-y-auto bg-white p-4"}>
                {children}
            </div>
            <TextInputForm/>
        </div>
    );
};