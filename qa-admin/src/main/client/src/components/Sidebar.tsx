import {FC, ReactNode} from 'react';

interface SidebarProps {
    children: ReactNode
}

export const Sidebar: FC<SidebarProps> = ({children}) => {

    return (
        <div
            className={"sticky top-20 flex flex-col min-w-60 rounded-lg p-4 border border-border/50 shadow-lg shadow-shadow/40 mr-4"}>
            {children}
        </div>
    );
}
