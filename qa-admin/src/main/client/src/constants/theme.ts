import {type Theme} from "../types/Theme";
import {ComputerDesktopIcon, MoonIcon, SunIcon} from "@heroicons/react/24/outline";

export type Themes = {
    light: Theme,
    dark: Theme,
    system: Theme
}

export const themes:Themes = {
    light: {id: "1", title: 'light', Icon: SunIcon},
    dark: {id: "2", title: 'dark', Icon: MoonIcon},
    system: {id: "3", title: 'system', Icon: ComputerDesktopIcon}
}