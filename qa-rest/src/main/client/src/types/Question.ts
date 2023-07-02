import {z} from "zod";

export const Question = z.string()
    .nonempty({message: "Не может быть пустым"})
    .min(15, {message: "Длина вопроса должна быть > 15 символов"})