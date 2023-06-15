import {describe, it, expect} from "vitest"
import {parseLinks} from "./parseLinks";

describe("parseLinks", () => {
    it.each([
        [
            "losos karas https://volpi.ru/sveden/education",
            "losos karas <a href='https://volpi.ru/sveden/education'>https://volpi.ru/sveden/education</a>"
        ],
        [
            "https://volpi.ru/sveden/education losos karas",
            "<a href='https://volpi.ru/sveden/education'>https://volpi.ru/sveden/education</a> losos karas"
        ],
        [
            "https://volpi.ru/losos/karas",
            "<a href='https://volpi.ru/losos/karas'>https://volpi.ru/losos/karas</a>"
        ],
        [
            "sdlkf sdf ksa https://volpi.ru/losos/karas asdlfk",
            "sdlkf sdf ksa <a href='https://volpi.ru/losos/karas'>https://volpi.ru/losos/karas</a> asdlfk"
        ]
    ])("text: '%s' should return '%s'", (text: string, expected: string) => {
        expect(parseLinks(text)).toBe(expected)
    });
})