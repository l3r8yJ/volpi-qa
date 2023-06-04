import {ICategoryNoQuestions} from "./ICategory";

export interface IQuestionNoID {
    text: string
    answer: string
    category: ICategoryNoQuestions
}

export interface IQuestion extends IQuestionNoID {
    id: number
}
