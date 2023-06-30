/** @type {import('tailwindcss').Config} */
import * as colors from 'tailwindcss/colors'

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.indigo["700"],
                primaryHov: colors.indigo["800"],
                secondary: colors.neutral["900"],
                secondaryEven: colors.neutral["800"],
                pale: colors.neutral["400"],
                paleHov: colors.neutral["200"],
                danger: colors.red["600"],
                dangerHov: colors.red["700"],
                safe: colors.green["600"],
                safeHov: colors.green["700"],
                border: colors.neutral["500"],
                contrast: colors.neutral["100"],
                contrastHov: colors.neutral["400"],
                shadow: colors.black,
                link: colors.indigo[400],
                linkHov: colors.indigo[500],
                skeleton: colors.neutral[500]
            },
        },
    },
    plugins: [],
}
