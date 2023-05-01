import {describe, expect, it} from "vitest";
import {bigString, stringWith200Chars, stringWith201Chars} from "./testData";
import {validateInputValue} from "./validateInputValue";


describe("validateInputValue", () =>{
    describe("check with default maxLength = 200", () => {
        it("string with length < maxLength gives 'success' result", () => {
            expect(validateInputValue("some default value")).toBe("success")
        })

        it("empty string gives 'cannot be empty' result", () => {
            expect(validateInputValue("")).toBe("cannot be empty")
        })

        it("string with length = maxLength gives 'success' result", () => {
            const result = validateInputValue(stringWith200Chars)
            expect(stringWith200Chars.length).toBe(200)
            expect(result).toBe('success')
        })

        it("string with length > maxLength gives 'too long' result", () => {
            expect(stringWith201Chars.length).toBe(201)
            expect(bigString.length).toBeGreaterThan(1000)

            expect(validateInputValue(stringWith201Chars)).toBe("too long")
            expect(validateInputValue(bigString)).toBe("too long")
        })
    })

})
