import {beforeEach, describe, expect, it} from "vitest";
import {render, RenderResult, screen} from "@testing-library/react";
import {PopupTestID} from "../../../constants/testIDs";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Popup} from "./Popup";


describe("Popup", () => {
    let popupElement: HTMLElement
    let renderOption: RenderResult
    const buttonText = "delete"
    beforeEach(() => {
        renderOption = render(
            <Popup
                ButtonElement={<XMarkIcon className={"w-5 h-5"}/>}
            >
                <button>{buttonText}</button>
            </Popup>
        )
        popupElement = screen.getByTestId(PopupTestID)
    })

    it("should be in the document", () => {
        expect(popupElement).toBeInTheDocument()
    })

    it("should open by clicking and correctly renders children prop only after click", () => {
        expect(popupElement).not.toHaveTextContent(buttonText)
        // fireEvent.click(popupElement)
        expect(popupElement).toHaveTextContent(buttonText)
    })

})
