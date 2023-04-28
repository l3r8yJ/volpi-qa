import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {render, RenderResult, screen} from "@testing-library/react";
import {Input} from "./Input";
import userEvent from "@testing-library/user-event";
import {InputTestID} from "../../../constants/testIDs";


describe("Input", () => {
    const inputValue = 42
    const onChangeInput = vi.fn()
    const onHoverInput = vi.fn()
    const onBlurInput = vi.fn()
    let renderOption: RenderResult
    let inputElement: HTMLInputElement
    describe("basic props and behaviour", () => {
        beforeEach(() => {
            renderOption = render(
                <input
                    data-testid={InputTestID}
                    value={inputValue}
                    onMouseEnter={onHoverInput}
                    onMouseLeave={onBlurInput}
                    onChange={(e) => onChangeInput(e.target.value)}
                />
            )
            inputElement = screen.getByTestId(InputTestID)
        })

        afterEach(() => {
            vi.clearAllMocks()
        })

        it("renders correctly", () => {
            const {container} = render(<input/>)
            expect(inputElement.value).toBe("42")
            expect(container.firstChild).toMatchSnapshot()

        })

        it("default value assigned correctly", () => {
            expect(inputElement.value).toBe('42')
        })
    })

    describe("user interaction", () => {
        beforeEach(() => {
            renderOption = render(
                <Input
                    data-testid={InputTestID}
                    value={inputValue}
                    onMouseEnter={onHoverInput}
                    onMouseLeave={onBlurInput}
                    onChange={(e) => onChangeInput(e.target.value)}
                />
            )
            inputElement = screen.getByTestId(InputTestID)
        })
        it("hover and blur effects works correctly", async () => {
            await userEvent.hover(inputElement)
            expect(onHoverInput).toBeCalled()
            expect(onBlurInput).not.toBeCalled()

            await userEvent.unhover(inputElement)
            expect(onBlurInput).toBeCalled()
        })

        it("handles user input correctly", async () => {
            await userEvent.type(inputElement, "90")
            expect(onChangeInput).toBeCalledWith("429")
            expect(onChangeInput).toBeCalledWith("420")
        })
    })

    it("renders label correctly", () => {
        render(
            <Input
                label={"login as administrator"}
            />
        )
        expect(screen.getByText("login as administrator")).toBeInTheDocument()
    })
})
