import {FC} from "react"
import {IQuestion} from "../types/IQuestion";

export const Question: FC<Omit<IQuestion, "id" | "category">> = ({text, answer}) => {
    return (
        <div className={"bg-neutral-100 rounded-lg p-2"}>
            <div className={"font-bold"}>{text}</div>
            <div>{answer}</div>
        </div>
    );
};