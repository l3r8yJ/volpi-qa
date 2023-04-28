import {rest} from "msw";
import {API_URL} from "../constants/api";
import {ICategory} from "../types/ICategory";
import {categories} from "../constants/categoriesMockData";


export const handlers = [
    rest.get(API_URL + "/categories", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json<ICategory[]>(categories))
    })
]
