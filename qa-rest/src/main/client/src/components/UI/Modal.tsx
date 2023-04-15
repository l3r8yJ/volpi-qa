import React, {FC} from 'react';
import {Dialog} from '@headlessui/react';

interface ModalProps {
    children: React.ReactNode
    isOpen: boolean
    setIsOpen: (visible: boolean) => void
}

export const Modal: FC<ModalProps> = ({children, isOpen, setIsOpen}) => {

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-[1001]"
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                {/* The actual dialog panel  */}
                <Dialog.Panel className="rounded-lg">
                    {children}
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
