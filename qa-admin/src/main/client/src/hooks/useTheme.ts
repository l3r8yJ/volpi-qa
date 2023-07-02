import { type Theme } from "../types/Theme";
import {useEffect, useState} from "react";
import { themes } from "../constants/theme";

export const useTheme = () => {
    const [selectedTheme, setSelectedTheme] = useState(themes.light);
    const switchTheme = (theme: Theme) => {
        switch (theme.title) {
            case 'light':
                localStorage.setItem("theme", "light");
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
                document.documentElement.style.backgroundColor = '#f9fafb';
                setSelectedTheme(themes.light);
                break;
            case 'dark':
                localStorage.setItem("theme", "dark")
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
                document.documentElement.style.backgroundColor = '#030712';
                setSelectedTheme(themes.dark);
                break;
            default:
                localStorage.setItem("theme", "system")
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.style.backgroundColor = '#030712';
                    setSelectedTheme(themes.system);
                } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.backgroundColor = '#f9fafb';
                    setSelectedTheme(themes.system);
                }
        }
    };

    return { selectedTheme, setSelectedTheme: switchTheme };
};