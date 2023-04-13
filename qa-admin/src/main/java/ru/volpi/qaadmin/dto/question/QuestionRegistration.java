package ru.volpi.qaadmin.dto.question;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import ru.volpi.qaadmin.domain.question.Question;

import java.io.Serializable;

import static ru.volpi.qaadmin.validation.message.QuestionMessages.ANSWER_CANNOT_BE_EMPTY;
import static ru.volpi.qaadmin.validation.message.QuestionMessages.QUESTION_TEXT_CANNOT_BE_EMPTY;

public record QuestionRegistration(
    @NotNull(message = QUESTION_TEXT_CANNOT_BE_EMPTY) String text,
    @NotNull(message = ANSWER_CANNOT_BE_EMPTY) String answer,
    @Valid QuestionsCategory category
) implements Serializable {
    public static QuestionRegistration from(final Question question) {
        return new QuestionRegistration(
            question.getText(),
            question.getAnswer(),
            QuestionsCategory.from(question.getCategory())
        );
    }
}
