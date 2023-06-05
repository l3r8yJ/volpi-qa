import {FC, ReactNode} from 'react';

interface SidebarProps {
    children: ReactNode
}

export const Sidebar: FC<SidebarProps> = ({children}) => {

    return (
        <div
            className={"fixed flex flex-col w-60 rounded-lg p-4 border border-base/50 shadow-lg shadow-shadow/40"}>
            {children}
        </div>
    );
}
