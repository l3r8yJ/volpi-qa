import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {CategoryRow} from "./CategoryRow";
import {Provider} from "react-redux";
import {createStore} from "../../../store/store";
import {BrowserRouter} from "react-router-dom";
import {CategoryRowTestID} from "../../../constants/testIDs";


describe("CategoryRow", () => {
    const idProp = 321
    const nameProp = "some category username"
    const {queryByText} = render(
        <Provider store={createStore()}>
            <BrowserRouter>
                <CategoryRow id={idProp} name={nameProp} testID={CategoryRowTestID}/>
            </BrowserRouter>
        </Provider>
    )
    const liElement = screen.getByTestId(CategoryRowTestID)

    it("correctly render props", () => {
        const id = queryByText(idProp)
        const name = queryByText(nameProp)
        expect(id).toBeInTheDocument()
        expect(name).toBeInTheDocument()
    })

    it("correctly render link to category", () => {
        const linkElement = liElement.querySelector("a")
        expect(linkElement).toHaveAttribute('href', `/categories/${nameProp}`)
    })
})
