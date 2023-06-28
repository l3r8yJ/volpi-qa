import {FC, ReactNode, useEffect, useState} from "react"
import {Dialog} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {PrimaryButton} from "./PrimaryButton/PrimaryButton";

type ModalProps = {
    title?: string
    description?: string
    children?: ReactNode
    buttonText: string
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export const Modal: FC<ModalProps> = ({title, description, children, buttonText, isOpen, setIsOpen}) => {
    return (
        <>
            <div className={"min-w-[200px]"}>
                <PrimaryButton onClick={() => setIsOpen(true)}>{buttonText}</PrimaryButton>
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30" aria-hidden="true"/>
                <div className="fixed inset-0 flex items-center justify-center p-4 z-30">
                    <Dialog.Panel
                        className={"bg-black relative p-6 rounded-lg flex flex-col gap-y-6 text-contrast w-full max-w-2xl"}>
                        <button
                            className={"absolute right-4 top-4 p-1 hover:text-contrastHov duration-150"}
                            onClick={() => setIsOpen(false)}
                        >
                            <XMarkIcon className={"w-5 h-5 "}/>
                        </button>
                        {title && <Dialog.Title className={"text-2xl mb-4"}>{title}</Dialog.Title>}
                        {description && <Dialog.Description className={"text-pale"}>
                            {description}
                        </Dialog.Description>}
                        {children}
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
};
