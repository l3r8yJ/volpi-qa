import {ICategory} from "../types/ICategory";

export const categories: ICategory[] = [
    {
        id: 1124, name: "first category", questions: [
            {
                id: 112930,
                text: "first question",
                answer: "first answer",
                category: {id: 1124, name: "first category"}
            }
        ]
    },
    {
        id: 22118, name: "second category", questions: [
            {
                id: 123252,
                text: "second question",
                answer: "second answer",
                category: {id: 22118, name: "second category"}
            }
        ]
    }
]
