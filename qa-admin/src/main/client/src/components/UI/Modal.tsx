import {FC, Fragment, ReactNode, useEffect, useState} from "react"
import {Dialog, Transition} from "@headlessui/react";
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
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as={"div"} open={isOpen} onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-shadow/30 backdrop-blur-sm z-30" aria-hidden="true"/>
                    </Transition.Child>
                    <div className="fixed inset-0 flex items-center justify-center p-4 z-30">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={"bg-contrast relative p-6 rounded-lg flex flex-col gap-y-6 text-primary-foreground w-full max-w-2xl"}>
                                <button
                                    className={"absolute right-4 top-4 p-1 hover:text-primary-foreground/80 duration-150"}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <XMarkIcon className={"w-5 h-5 "}/>
                                </button>
                                {title && <Dialog.Title className={"text-2xl mb-4"}>{title}</Dialog.Title>}
                                {description && <Dialog.Description className={"text-pale-foreground"}>
                                    {description}
                                </Dialog.Description>}
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};
