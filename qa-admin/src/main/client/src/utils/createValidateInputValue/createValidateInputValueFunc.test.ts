import { describe, expect, it } from "vitest";
import { createValidateInputValueFunc } from "./createValidateInputValueFunc";
import { generateRandomString } from "../generateRandomString/generateRandomString";

describe("validateInputValue", () => {
  const validateInputValue = createValidateInputValueFunc();
  describe("check with default maxLength = 200", () => {
    it.each([
      {
        str: generateRandomString(Math.floor(Math.random() * 100) + 1),
        expected: "выглядит хорошо!",
      },
      { str: generateRandomString(200), expected: "выглядит хорошо!" },
      { str: generateRandomString(1), expected: "выглядит хорошо!" },
      { str: generateRandomString(201), expected: "слишком длинное" },
      {
        str: generateRandomString(Math.floor(Math.random() * 1000 + 200)),
        expected: "слишком длинное",
      },
      { str: generateRandomString(0), expected: "не может быть пустым" },
    ])(
      "string with length $str.length should gives %s",
      ({ str, expected }) => {
        expect(validateInputValue(str)).toBe(expected);
      }
    );
  });

  describe("check type handles correctly", () => {
    it("should return 'неправильный тип' for all types except string", () => {
      const undefinedConst = undefined;
      const numberConst: number = 123;
      const stringArr: string[] = ["123", "324", "345"];
      const stringConst: string = "test string";
      expect(validateInputValue(undefinedConst)).toBe("неправильный тип");
      expect(validateInputValue(numberConst)).toBe("неправильный тип");
      expect(validateInputValue(stringArr)).toBe("неправильный тип");
      expect(validateInputValue(stringConst)).not.toBe("неправильный тип");
    });
  });
});
