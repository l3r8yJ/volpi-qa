import {IQuestion} from "./IQuestion";

export interface ICategoryNoQuestions {
    id: number
    name: string
}

export interface ICategory extends ICategoryNoQuestions {
    questions: IQuestion[]
}
