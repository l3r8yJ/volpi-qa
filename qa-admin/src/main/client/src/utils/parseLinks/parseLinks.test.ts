import {describe, expect, it} from "vitest"
import {parseLinks} from "./parseLinks";

const aClasses = '\"text-link-foreground hover:text-link-foreground/80\"'

describe("parseLinks", () => {
    it.each([
        [
            "losos karas https://volpi.ru/sveden/education",
            `losos karas <a href='https://volpi.ru/sveden/education' class=${aClasses}>volpi.ru/sveden/education</a>`
        ],
        [
            "https://volpi.ru/sveden/education losos karas",
            `<a href='https://volpi.ru/sveden/education' class=${aClasses}>volpi.ru/sveden/education</a> losos karas`
        ],
        [
            "https://volpi.ru/losos/karas",
            `<a href='https://volpi.ru/losos/karas' class=${aClasses}>volpi.ru/losos/karas</a>`
        ],
        [
            "sdlkf sdf ksa https://volpi.ru/losos/karas asdlfk",
            `sdlkf sdf ksa <a href='https://volpi.ru/losos/karas' class=${aClasses}>volpi.ru/losos/karas</a> asdlfk`
        ],
        [
            "some big link vk.com/fjhasdkjfhajksdhfkadshkfhasjdkhfjkashdfkhkajsdfhasjkdhfkjashdjkfhaksjhdfkjhasdhfkjahsdkfljhaskjdhfkjhasd",
            `some big link <a href='https://vk.com/fjhasdkjfhajksdhfkadshkfhasjdkhfjkashdfkhkajsdfhasjkdhfkjashdjkfhaksjhdfkjhasdhfkjahsdkfljhaskjdhfkjhasd' class=${aClasses}>vk.com/fjhasdkjfhajksdhfkadshkfhasjdkhfj...</a>`
        ],
        [
            "andrew-semyonov.vercel.app",
            `<a href='https://andrew-semyonov.vercel.app' class=${aClasses}>andrew-semyonov.vercel.app</a>`
        ]
    ])("text: '%s' should return '%s'", (text: string, expected: string) => {
        expect(parseLinks(text)).toBe(expected)
    });
})