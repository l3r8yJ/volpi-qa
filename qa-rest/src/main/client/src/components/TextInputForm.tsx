import {FC, useEffect, useRef, useState} from 'react';
import {PaperAirplaneIcon} from "@heroicons/react/24/solid";
import {Combobox} from "@headlessui/react";
import {ChevronUpDownIcon} from "@heroicons/react/24/outline";

const people = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan',
]

export const TextInputForm: FC = () => {
    const [selectedPerson, setSelectedPerson] = useState("")
    const [query, setQuery] = useState('')

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <div className={"bg-white"}>
        <Combobox value={selectedPerson} onChange={setSelectedPerson}>
            <Combobox.Options className={"max-h-36 overflow-y-auto rounded-lg overflow-hidden border py-1.5 mb-3 mx-2 shadow-lg shadow-neutral-500/50"}>
                {filteredPeople.map((person) => (
                    <Combobox.Option
                        key={person}
                        value={person}
                        className={({active}) =>
                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-blue-600 text-white' : 'text-gray-900'}`}
                    >
                        {person}
                    </Combobox.Option>
                ))}
            </Combobox.Options>
            <form className={"flex py-4 px-2 bg-zinc-50 border-t"}>
                <div
                    className={"border w-full rounded-lg flex space-x-4 items-end p-2 shadow-lg shadow-zinc-500/20 bg-white"}>
                    <Combobox.Input
                        className={"w-full outline-none"}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={"Категория или вопрос..."}
                    />
                    <Combobox.Button><ChevronUpDownIcon className={"w-6 h-6"}/></Combobox.Button>
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
