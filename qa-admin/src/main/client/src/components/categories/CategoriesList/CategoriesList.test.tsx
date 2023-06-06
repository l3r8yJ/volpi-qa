import {beforeEach, describe, expect, it} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import {Provider} from "react-redux";
import {createStore} from "../../../store/store";
import {CategoriesList} from "./CategoriesList";
import {BrowserRouter} from "react-router-dom";
import {CategoriesListTestID} from "../../../constants/testIDs";


describe("CategoriesList", () => {
    let CategoriesListElement: HTMLElement
    let CategoryRowElements: HTMLElement[]
    beforeEach(async () => {
        render(
            <Provider store={createStore()}>
                <BrowserRouter>
                    <CategoriesList testID={CategoriesListTestID}/>
                </BrowserRouter>
            </Provider>
        )
        CategoriesListElement = await waitFor(() => screen.getByTestId(CategoriesListTestID))
        CategoryRowElements = await waitFor(() => screen.getAllByTestId("CategoryRow-testID"))
    })

    it("gets the data correctly", () => {
        expect(CategoryRowElements[0]).toHaveTextContent("first category")
        expect(CategoryRowElements[1]).toHaveTextContent("second category")
    })
})
