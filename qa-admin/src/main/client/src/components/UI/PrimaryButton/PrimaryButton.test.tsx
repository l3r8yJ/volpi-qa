import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {render, RenderResult, screen} from "@testing-library/react";
import {PrimaryButton} from "./PrimaryButton";
import userEvent from "@testing-library/user-event";
import {PrimaryButtonTestID} from "../../../constants/testIDs";

describe("PrimaryButton", () => {
    let buttonElement: HTMLButtonElement
    const buttonTitle = "42"
    let renderOption: RenderResult
    const buttonOnClick = vi.fn()
    const buttonOnHover = vi.fn()
    const buttonOnBlur = vi.fn()

    describe("default behaviour", () => {
        beforeEach(() => {
            renderOption = render(
                <PrimaryButton
                    data-testid={PrimaryButtonTestID}
                >
                    {buttonTitle}
                </PrimaryButton>)
            buttonElement = screen.getByTestId(PrimaryButtonTestID)
        })

        it("renders correctly with default and additional classes", () => {
            expect(buttonElement).toHaveClass("bg-primary px-4 py-2 rounded-lg hover:bg-primaryHov w-full max-w-[250px]")
            renderOption.rerender(
                <PrimaryButton
                    data-testid={PrimaryButtonTestID}
                    className={"bg-secondary text-contrast"}
                >
                    {buttonTitle}
                </PrimaryButton>
            )
            expect(buttonElement).toHaveClass("bg-secondary text-contrast")
        })

        it("renders correctly default title", () => {
            expect(buttonElement).toHaveTextContent(buttonTitle)
            expect(buttonElement).toMatchSnapshot()
        })
    })
    describe("user iteraction", () => {
        beforeEach(() => {
            render(
                <PrimaryButton
                    data-testid={PrimaryButtonTestID}
                    onClick={buttonOnClick}
                    onMouseLeave={buttonOnBlur}
                    onMouseEnter={buttonOnHover}
                >
                    {buttonTitle}
                </PrimaryButton>)
            buttonElement = screen.getByTestId(PrimaryButtonTestID)
        })

        afterEach(() => {
            vi.clearAllMocks()
        })

        it("handle click correctly", async () => {
            await userEvent.click(buttonElement)
            expect(buttonOnClick).toHaveBeenCalledOnce()
        })

        it("hover and blur effects works correctly", async () => {
            await userEvent.hover(buttonElement)
            expect(buttonOnHover).toHaveBeenCalledOnce()
            expect(buttonOnBlur).not.toBeCalled()

            await userEvent.unhover(buttonElement)
            expect(buttonOnBlur).toHaveBeenCalledOnce()
        })
    })
})
