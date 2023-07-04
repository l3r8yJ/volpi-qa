import React, {useEffect, createContext, useState, useContext, FC, ReactNode} from "react";
import {themes} from "../constants/theme";
import {Theme} from "../types/Theme";

interface ThemeContextProps {
    selectedTheme: Theme;
    setSelectedTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    selectedTheme: themes.system,
    setSelectedTheme: () => {
    },
});

export const ThemeProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [selectedTheme, setSelectedTheme] = useState(themes.system);
    const [themeLoaded, setThemeLoaded] = useState(false);

    useEffect(() => {
        const themeName = localStorage.getItem("theme") ?? "system";
        const theme = themes[themeName as "light" | "dark" | "system"] || themes.system;
        setSelectedTheme(theme);
        setThemeLoaded(true);
    }, []);

    const setTheme = (theme: Theme) => {
        switch (theme.title) {
            case "light":
                localStorage.setItem("theme", "light");
                document.documentElement.classList.add("light");
                document.documentElement.classList.remove("dark");
                document.documentElement.style.backgroundColor = "#f9fafb";
                setSelectedTheme(themes.light);
                break;
            case "dark":
                localStorage.setItem("theme", "dark");
                document.documentElement.classList.add("dark");
                document.documentElement.classList.remove("light");
                document.documentElement.style.backgroundColor = "#030712";
                setSelectedTheme(themes.dark);
                break;
            default:
                localStorage.setItem("theme", "system");
                if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                    document.documentElement.classList.add("dark");
                    document.documentElement.classList.remove("light");
                    document.documentElement.style.backgroundColor = "#030712";
                    setSelectedTheme(themes.system);
                } else {
                    document.documentElement.classList.add("light");
                    document.documentElement.classList.remove("dark");
                    document.documentElement.style.backgroundColor = "#f9fafb";
                    setSelectedTheme(themes.system);
                }
        }
    };

    useEffect(() => {
        // Apply the theme styles after the component mounts and the initial theme is set
        if (themeLoaded) {
            setTheme(selectedTheme);
        }
        console.log("call useEffect")
    }, [themeLoaded, selectedTheme]);

    return (
        <ThemeContext.Provider value={{selectedTheme, setSelectedTheme: setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
