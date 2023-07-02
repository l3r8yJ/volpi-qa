import {z} from "zod";

export const ownQuestionSchema = z.object({
    email: z.string().email({
        message: "Пожалуйста, введите валидный email"
    }),
    text: z.string().min(15, "Вопрос должен быть > 15 символов")
})