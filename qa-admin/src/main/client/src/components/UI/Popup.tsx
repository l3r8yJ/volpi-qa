import {FC, ReactElement, ReactNode} from 'react';
import {PopupTestID} from "../../constants/testIDs";
import {Popover} from "@headlessui/react";

interface PopupProps {
    ButtonElement: ReactElement
    children?: ReactNode
    optionButtons?: ReactElement[]
    title?: string
}

export const Popup: FC<PopupProps> = ({ButtonElement, children, title, optionButtons}) => {
    const testID = process.env.NODE_ENV === "test" ? PopupTestID : undefined
    return (
        <Popover className="relative flex outline-none" data-testid={testID}>
            <Popover.Button className={"outline-none"}>{ButtonElement}</Popover.Button>
            <Popover.Panel
                className="absolute z-10 right-0 top-10 bg-neutral-900 shadow-lg shadow-black/40 p-4 rounded-lg min-w-[250px] space-y-4"
            >
                {title && <div className={"text-xl"}>{title}</div>}
                {children}
                {optionButtons &&
                    <div className={"space-x-2 flex justify-between"}>
                        {optionButtons.map(btn => (
                            <Popover.Button key={Math.random()} as={"div"}>{btn}</Popover.Button>
                        ))}
                    </div>
                }
            </Popover.Panel>
        </Popover>
    );
}
