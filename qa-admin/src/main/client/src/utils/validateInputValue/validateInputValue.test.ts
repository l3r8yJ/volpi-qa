import {describe, expect, it} from "vitest";
import {bigString, stringWith200Chars, stringWith201Chars} from "./testData";
import {validateInputValue} from "./validateInputValue";


describe("validateInputValue", () =>{
    describe("check with maxLength = 200", () => {
        const maxLength = 200


        it("string with length < maxLength gives 'success' result", () => {
            expect(validateInputValue("some default value", maxLength)).toEqual({message: "success", ok: true})
        })

        it("string with length = maxLength gives 'success' result", () => {
            const result = validateInputValue(stringWith200Chars, maxLength)
            expect(stringWith200Chars.length).toBe(200)
            expect(result.message).toBe('success')
            expect(result.ok).toBe(true)
        })

        it("string with length > maxLength gives 'too long' result", () => {
            const maxLength = 200
            expect(stringWith201Chars.length).toBe(201)
            expect(bigString.length).toBeGreaterThan(1000)

            expect(validateInputValue(stringWith201Chars, maxLength)).toEqual({message: "too long", ok: false})
            expect(validateInputValue(bigString, maxLength)).toEqual({message: "too long", ok: false})
        })
    })

})
