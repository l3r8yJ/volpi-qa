import {AxiosResponse} from "axios";
import {ICategory} from "../types/ICategory";
import {$api} from "../http/api";
import {IQuestion} from "../types/IQuestion";

export class QuestionService {
    static fetchAllQuestions(): Promise<AxiosResponse<IQuestion[]>> {
        return $api.get<IQuestion[]>("questions")
    }

    static fetchQuestionById(id: number): Promise<AxiosResponse<IQuestion>> {
        return $api.get<IQuestion>("questions/" + id)
    }

    static createQuestion(question: IQuestion): Promise<AxiosResponse<ICategory>> {
        return $api.put<ICategory>("questions", {question})
    }

    static deleteQuestion(id: number): Promise<AxiosResponse<IQuestion>> {
        return $api.delete<IQuestion>("questions/" + id)
    }

    static updateQuestion(question: IQuestion): Promise<AxiosResponse<IQuestion>> {
        return $api.patch<IQuestion>("questions/" + question.id, {question})
    }

    static fetchQuestionsByCategory(categoryName: string): Promise<AxiosResponse<IQuestion[]>> {
        return $api.get<IQuestion[]>("questions/by-category/" + categoryName)
    }

}
