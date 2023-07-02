/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))"
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))"
                },
                btn: {
                    foreground: "hsl(var(--btn-foreground))"
                },
                contrast: {
                    DEFAULT: "hsl(var(--contrast))",
                    foreground: "hsl(var(--contrast-foreground))"
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))"
                },
                safe: {
                    DEFAULT: "hsl(var(--safe))",
                    foreground: "hsl(var(--safe-foreground))"
                },
                danger: {
                    DEFAULT: "hsl(var(--danger))",
                    foreground: "hsl(var(--danger-foreground))"
                },
                pale: {
                    DEFAULT: "hsl(var(--pale))",
                    foreground: "hsl(var(--pale-foreground))"
                },
                link:{
                    DEFAULT: "hsl(var(--link))",
                    foreground: "hsl(var(--link-foreground))"
                },
                selected:{
                    foreground: "hsl(var(--selected-foreground))"
                },
                active: "hsl(var(--active))",
                border: "hsl(var(--border))",
                shadow: "hsl(var(--shadow))",
                skeleton: "hsl(var(--skeleton))",
            },
        },
    },
    plugins: [],
}
