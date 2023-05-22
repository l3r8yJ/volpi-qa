import React, {FC} from 'react';
import {useAppSelector} from "../hooks/redux";
import {ArrowLeftIcon, XMarkIcon} from "@heroicons/react/24/outline";

interface ChatHeaderProps {
    setModalIsOpen: (visible: boolean) => void
}

export const ChatHeader: FC<ChatHeaderProps> = ({setModalIsOpen}) => {
    const {currentCategory} = useAppSelector(state => state.view)
    return (
        <div className={"p-4 text-xl text-white flex items-center justify-between bg-zinc-800"}>
            <button
                className={"text-white hover:text-neutral-300"}
            >
                <ArrowLeftIcon className={"w-6 h-6"}/>
            </button>
            {currentCategory === null
                ? <h1>Поступи в ВПИ!</h1>
                : <h1>{currentCategory.name}</h1>
            }
            <button
                className={"text-white hover:text-neutral-300"}
                onClick={() => setModalIsOpen(false)}
            >
                <XMarkIcon className={"w-6 h-6"}/>
            </button>
        </div>
    );
}
