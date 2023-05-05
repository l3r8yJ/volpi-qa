import {describe, expect, it} from "vitest";
import {generateRandomString} from "./generateRandomString";

describe("generateRandomString", () => {
    it.each([
        [1, 1],
        [20, 20],
        [9999999, 9999999],
    ])("generateRandomString(%d).length === %d", (length, expectedLength) =>{
        expect(generateRandomString(length).length).toBe(expectedLength)
    })
})
