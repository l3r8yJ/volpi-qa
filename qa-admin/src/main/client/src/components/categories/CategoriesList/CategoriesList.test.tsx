import {describe, expect, it} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import {Provider} from "react-redux";
import {createStore} from "../../../store/store";
import {CategoriesList} from "./CategoriesList";
import {BrowserRouter} from "react-router-dom";


describe("CategoriesList", () => {
    it("gets the data", async () => {
        const CategoriesListTestID = "CategoriesList-testID"
        render(
            <Provider store={createStore()}>
                <BrowserRouter>
                    <CategoriesList testID={CategoriesListTestID}/>
                </BrowserRouter>
            </Provider>
        )
        const CategoriesListElement = screen.getByTestId(CategoriesListTestID)
        const CategoryRowElements = await waitFor(() => screen.getAllByTestId("CategoryRow-testID"))
        expect(CategoryRowElements[0]).toHaveTextContent("first category")
        expect(CategoryRowElements[1]).toHaveTextContent("second category")
    })
})
