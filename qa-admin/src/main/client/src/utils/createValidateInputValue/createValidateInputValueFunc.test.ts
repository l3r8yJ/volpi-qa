import {describe, expect, it} from "vitest";
import {bigString, stringWith200Chars, stringWith201Chars} from "./testData";
import {createValidateInputValueFunc} from "./validateInputValue";


describe("validateInputValue", () => {
    const validateInputValue = createValidateInputValueFunc()
    describe("check with default maxLength = 200", () => {
        it("string with length < maxLength gives 'выглядит хорошо' result", () => {
            expect(validateInputValue("some default value")).toBe("выглядит хорошо!")
        })

        it("empty string gives 'не может быть пустым' result", () => {
            expect(validateInputValue("")).toBe("не может быть пустым")
        })

        it("string with length = maxLength gives 'выглядит хорошо!' result", () => {
            const result = validateInputValue(stringWith200Chars)
            expect(stringWith200Chars.length).toBe(200)
            expect(result).toBe('выглядит хорошо!')
        })

        it("string with length > maxLength gives 'слишком длинное' result", () => {
            expect(stringWith201Chars.length).toBe(201)
            expect(bigString.length).toBeGreaterThan(1000)

            expect(validateInputValue(stringWith201Chars)).toBe("слишком длинное")
            expect(validateInputValue(bigString)).toBe("слишком длинное")
        })
    })

    describe("check type handles correctly", () => {
        it("should return 'неправильный тип' for all types except string", () => {
            const undefinedConst = undefined
            const numberConst: number = 123
            const stringArr:string[] = ["123", "324", "345"]
            const stringConst :string = "test string"
            expect(validateInputValue(undefinedConst)).toBe("неправильный тип")
            expect(validateInputValue(numberConst)).toBe("неправильный тип")
            expect(validateInputValue(stringArr)).toBe("неправильный тип")
            expect(validateInputValue(stringConst)).not.toBe("неправильный тип")
        })
    })
})
