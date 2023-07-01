import {FC, ReactNode} from "react"
import {ChatHeader} from "./ChatHeader";
import {TextInputForm} from "./TextInputForm";
import {useAppSelector} from "../hooks/redux";

interface LayoutProps {
    children: ReactNode
}

export const Layout: FC<LayoutProps> = ({children}) => {
    const {isActiveForm} = useAppSelector(state => state.question)
    return (
        <div className={"rounded-lg overflow-hidden text-zinc-900 relative h-[600px] flex flex-col"}>
            <ChatHeader/>
            <div className={`flex-grow relative bg-white ${isActiveForm ? "overflow-hidden" : "overflow-y-auto"}`}>
                <div className="relative p-4 min-h-full">
                    {isActiveForm &&
                        <div className={"w-full h-full bg-black/10 z-10 transform top-0 right-1/2 backdrop-blur-sm translate-x-1/2 absolute"}/>
                    }
                    <div className={"space-y-4 bg-white pb-4"}>
                        {children}
                    </div>
                </div>
            </div>
            <TextInputForm/>
        </div>
    );
};