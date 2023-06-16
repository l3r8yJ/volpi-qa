import {FC} from "react"
import {IQuestion} from "../types/IQuestion";
import {Disclosure} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {parseLinks} from "../utils/parseLinks";

export const Question: FC<Omit<IQuestion, "id" | "category">> = ({text, answer}) => {
    return (
        <Disclosure>
            <div
                className={"w-full flex justify-center flex-col"}>
                <Disclosure.Button
                    className={"p-2 flex justify-between items-center bg-neutral-100 hover:bg-neutral-200 rounded-lg"}>
                    <div
                        className={"font-medium text-left w-5/6 break-words"}
                        dangerouslySetInnerHTML={{__html: parseLinks(text)}}
                    ></div>
                    <ChevronDownIcon
                        className={"w-4 h-4 ml-2 ui-open:rotate-180 ui-not-open:rotate-0 ui-open:transform ui-open:duration-150"}/>
                </Disclosure.Button>
                <Disclosure.Panel
                    className={"px-2 pt-2 text-neutral-900/60 text-sm break-words"}
                    dangerouslySetInnerHTML={{__html: parseLinks(answer)}}
                ></Disclosure.Panel>
            </div>
        </Disclosure>
    );
};