import {IQuestion} from "./IQuestion";

export interface ICategory{
    id: number
    name: string
    questions: IQuestion[]
}
