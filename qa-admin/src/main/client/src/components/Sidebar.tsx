import {FC, ReactNode} from 'react';

interface SidebarProps {
    children: ReactNode
}

export const Sidebar: FC<SidebarProps> = ({children}) => {

    return (
        <div
            className={"fixed flex flex-col w-60 rounded-lg p-4 border border-neutral-500/50 shadow-lg shadow-neutral-800/80"}>
            {children}
        </div>
    );
}
