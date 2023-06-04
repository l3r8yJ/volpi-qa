import {beforeEach, describe, expect, it} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {createStore} from "../../../store/store";
import {CategoriesForm} from "./CategoriesForm";
import {generateRandomString} from "../../../utils/generateRandomString/generateRandomString";


describe("CategoriesForm", () => {
    let buttonElement: HTMLButtonElement
    beforeEach(async () => {
        render(
            <Provider store={createStore()}>
                <CategoriesForm/>
            </Provider>
        )
        buttonElement = screen.getByText("Новая категория")
    })

    it("should correctly render text in UI", () => {
        const labelElement = screen.getByText("Название категории")

        expect(labelElement).toBeInTheDocument()
        expect(buttonElement).toBeInTheDocument()
    })

    it.todo("should correctly handle update category action", () => {
        const inputElement = screen.getByLabelText("Название категории")
        const randomString = generateRandomString(100)
        fireEvent.change(inputElement, {target: {value: randomString}})
        fireEvent.click(buttonElement)

    })

})