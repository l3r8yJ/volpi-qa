import {FC} from "react"
import {IQuestion} from "../types/IQuestion";
import {Disclosure} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/24/outline";

export const Question: FC<Omit<IQuestion, "id" | "category">> = ({text, answer}) => {
    return (
        <Disclosure >
            <Disclosure.Button className={"bg-blue-100 rounded-lg p-2 flex justify-between text-blue-900"}>
                <span className={"font-semibold"}>{text}</span>
                <ChevronDownIcon className={"w-4 h-4 ui-open:rotate-180 ui-not-open:rotate-0"}/>
            </Disclosure.Button>
            <Disclosure.Panel>{answer}</Disclosure.Panel>
        </Disclosure>
    );
};