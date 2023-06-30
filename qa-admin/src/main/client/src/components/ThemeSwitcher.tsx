import React, {FC, useEffect} from "react"
import {useTheme} from "../hooks/useTheme";
import {themes} from "../constants/theme";
import {ChevronDownIcon, MoonIcon, SunIcon} from "@heroicons/react/24/outline";
import {Listbox} from "@headlessui/react";

export const ThemeSwitcher: FC = () => {
    const {selectedTheme, setSelectedTheme} = useTheme();
    useEffect(() => {
        const themeName = localStorage.getItem("theme") ?? "system";
        const theme =
            themes[themeName as "light" | "dark" | "system"] || themes.system;
        setSelectedTheme(theme);
    }, [setSelectedTheme]);
    return (
        <div className={"relative z-10"}>
            <Listbox value={selectedTheme} onChange={setSelectedTheme}>
                <Listbox.Button
                    className={"flex items-center border border-border/50 bg-secondary hover:bg-secondary/80 h-10 px-4 space-x-1.5 text-secondary-foreground rounded-3xl"}>
                    {localStorage.theme === "system" ? (
                        window.matchMedia("(prefers-color-scheme: dark)").matches ? (
                            <MoonIcon className={"h-6 w-6"}/>
                        ) : (
                            <SunIcon className={"h-6 w-6"}/>
                        )
                    ) : (
                        <selectedTheme.Icon className={"h-6 w-6"}/>
                    )}
                    <ChevronDownIcon className={"w-4 h-4"}/>
                </Listbox.Button>
                <Listbox.Options
                    className={"absolute top-full right-0 mt-6 w-36 rounded-lg py-1 shadow-lg overflow-hidden bg-secondary shadow-shadow/50"}>
                    {Object.values(themes).map((theme) => (
                        <Listbox.Option
                            key={theme.id}
                            value={theme}
                        >
                            {({active, selected}) => (
                                <div
                                    className={`px-2 py-1 cursor-pointer 
                                ${active ? "bg-active" : ""}
                                ${selected ? "text-selected-foreground" : ""}`}
                                >
                                    <div className={"flex capitalize"}>
                                        <theme.Icon className={"w-6 h-6 mr-2"}/>
                                        {theme.title}
                                    </div>
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    );
};