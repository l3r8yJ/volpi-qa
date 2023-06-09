import {AxiosResponse} from "axios";
import {$api} from "../http/api";
import {AnsweredUnknownQuestion, IQuestion, IQuestionNoID, UnknownQuestion} from "../types/IQuestion";

export class QuestionService {
    static fetchAllQuestions(): Promise<AxiosResponse<IQuestion[]>> {
        return $api.get<IQuestion[]>("questions")
    }

    static fetchQuestionById(id: number): Promise<AxiosResponse<IQuestion>> {
        return $api.get<IQuestion>("questions/" + id)
    }

    static createQuestion(question: IQuestionNoID): Promise<AxiosResponse<IQuestion>> {
        return $api.put<IQuestion>("questions", question)
    }

    static deleteQuestion(id: number): Promise<AxiosResponse<IQuestion>> {
        return $api.delete<IQuestion>("questions/" + id)
    }

    static updateQuestion(question: IQuestion): Promise<AxiosResponse<IQuestion>> {
        return $api.patch<IQuestion>("questions/" + question.id, question)
    }

    static fetchQuestionsByCategory(categoryName: string): Promise<AxiosResponse<IQuestion[]>> {
        return $api.get<IQuestion[]>("questions/by-category/" + categoryName)
    }

    static fetchUnknownQuestions():Promise<AxiosResponse<UnknownQuestion[]>>{
        return $api.get<UnknownQuestion[]>("questions/unknown")
    }

    static deleteUnknownQuestion(id: number):Promise<AxiosResponse<UnknownQuestion>>{
        console.log(id)
        return $api.delete<UnknownQuestion>("questions/unknown/" + id)
    }

    static answerUnknownQuestion(question: AnsweredUnknownQuestion):Promise<AxiosResponse<IQuestion>>{
        return $api.patch<IQuestion>("questions/answer", question)
    }

}
