import {$api} from "../http/api";
import {AxiosResponse} from "axios";
import {IQuestion} from "../types/IQuestion";
import {OwnQuestion} from "../types/ownQuestion";


export class QuestionService {
    static fetchAllQuestions(): Promise<AxiosResponse<IQuestion[]>> {
        return $api.get<IQuestion[]>("questions")
    }

    static fetchQuestionById(id: number): Promise<AxiosResponse<IQuestion>> {
        return $api.get<IQuestion>(`questions/${id}`)
    }

    static fetchQuestionByText(text: string): Promise<AxiosResponse<IQuestion>> {
        return $api.get<IQuestion>(`questions/by-text/${text}`)
    }

    static fetchQuestionsByCategory(categoryName: string): Promise<AxiosResponse<IQuestion[]>> {
        return $api.get<IQuestion[]>(`questions/by-category/${categoryName}`)
    }

    static createOwnQuestion(ownQuestion:OwnQuestion): Promise<AxiosResponse<string>>{
        return $api.post<string>(`questions`, {...ownQuestion})
    }
}
