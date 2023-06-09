import {FC, ReactElement, ReactNode} from 'react';
import {PopupTestID} from "../../constants/testIDs";
import {Popover} from "@headlessui/react";

interface PopupProps {
    ButtonElement: ReactElement
    children?: ReactNode
    optionButtons?: ReactElement[]
    title?: string
    position?: "left" | "right"
}

export const Popup: FC<PopupProps> = ({ButtonElement, children, title, position = "left", optionButtons}) => {
    const testID = process.env.NODE_ENV === "test" ? PopupTestID : undefined
    return (
        <Popover className="relative flex outline-none" data-testid={testID}>
            <Popover.Button className={"outline-none"} as={"div"}>{ButtonElement}</Popover.Button>
            <Popover.Panel
                className={`absolute text-primary-foreground z-10 ${position === "left" ? "right-0" : "left-0"} top-10 bg-primary shadow-lg shadow-shadow/40 p-4 rounded-lg min-w-[300px] w-auto space-y-4`}
            >
                {title && <div className={"text-lg"}>{title}</div>}
                {children}
                {optionButtons &&
                    <div className={"flex flex-col gap-y-2"}>
                        {optionButtons.map(btn => (
                            <Popover.Button key={Math.random()} as={"div"}>{btn}</Popover.Button>
                        ))}
                    </div>
                }
            </Popover.Panel>
        </Popover>
    );
}
