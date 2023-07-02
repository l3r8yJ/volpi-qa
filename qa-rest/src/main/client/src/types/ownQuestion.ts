import {z} from "zod";
import {ownQuestionSchema} from "../lib/validation/ownQuestion";

export type OwnQuestion = z.infer<typeof ownQuestionSchema>
