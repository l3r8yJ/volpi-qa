package ru.volpi.qaadmin.dto.question;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import ru.volpi.qaadmin.domain.question.Question;
import ru.volpi.qaadmin.dto.category.CategoryRegistration;
import ru.volpi.qaadmin.dto.category.CategoryResponse;

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

    public static QuestionRegistration from(@Valid final QuestionRegistration registration, final Long categoryId) {
        return new QuestionRegistration(
            registration.text(),
            registration.answer(),
            new QuestionsCategory(categoryId, registration.category().name())
        );
    }
}
