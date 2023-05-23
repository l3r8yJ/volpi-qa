import {FC, Fragment, useEffect, useState} from 'react';
import {PaperAirplaneIcon} from "@heroicons/react/24/solid";
import {Combobox} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/24/outline";
import {useAppSelector} from "../hooks/redux";

export const TextInputForm: FC = () => {
    const [questionsAndCategories, setQuestionsAndCategories] = useState<Array<string>>([])
    const [selectedValue, setSelectedValue] = useState("")
    const [query, setQuery] = useState('')

    const {categories} = useAppSelector(state => state.category)
    useEffect(() => {
        setQuestionsAndCategories([
            ...categories.flatMap(category => category.questions.map(question => question.text))
        ])
    }, [categories])

    return (
        <div className={"bg-white"}>
            <Combobox value={selectedValue} onChange={setSelectedValue}>
                <Combobox.Options
                    className={"max-h-36 overflow-y-auto rounded-lg overflow-hidden border py-1.5 mb-3 mx-2 shadow-lg shadow-neutral-500/50"}>
                    {filteredPeople.map((person) => (
                        <Combobox.Option
                            key={person}
                            value={person}
                            as={Fragment}
                        >
                            {({active, selected}) => (
                                <li
                                    className={`cursor-pointer select-none flex p-2 pl-10 pr-2 relative
                                    ${active ? 'bg-blue-600 text-white ' : ' text-gray-900'}`}
                                >
                                    <span>
                                        {selected ? (
                                                <span className={"font-semibold"}>{person}</span>
                                            )
                                            : (
                                                <span>{person}</span>
                                            )}
                                    </span>
                                    <span
                                        className={"absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 ui-active:text-white"}
                                    >
                                            <CheckIcon className="h-5 w-5 hidden ui-selected:block" aria-hidden="true"/>
                                        </span>
                                </li>
                            )}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
                <form className={"flex py-4 px-2 bg-zinc-50 border-t"}>
                    <div
                        className={"border w-full rounded-lg flex space-x-4 items-end p-2 shadow-lg shadow-zinc-500/20 bg-white"}>
                        <Combobox.Input
                            className={"w-full outline-none"}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={"Спросите что-нибудь..."}
                        />
                        <Combobox.Button>
                            <ChevronUpDownIcon className={"w-6 h-6 hover:text-neutral-500 duration-150"}/>
                        </Combobox.Button>
                    </div>
                    <button className={"ml-2"}>
                        <PaperAirplaneIcon
                            className={"w-6 h-6 cursor-pointer text-blue-400 hover:text-blue-600 duration-200 "}/>
                    </button>
                </form>
            </Combobox>
        </div>
    );
}
