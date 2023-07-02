import {z} from "zod";

export const Email = z.string()
    .nonempty({message: "Не может быть пустым"})
    .email({message: "Не валидный email"})