package ru.volpi.qaadmin.dto.question;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

import static ru.volpi.qaadmin.validation.message.CategoryMessages.CATEGORY_NOT_PROVIDED;
import static ru.volpi.qaadmin.validation.message.QuestionMessages.ANSWER_CANNOT_BE_EMPTY;
import static ru.volpi.qaadmin.validation.message.QuestionMessages.QUESTION_TEXT_CANNOT_BE_EMPTY;

/**
 * A DTO for the {@link ru.volpi.qaadmin.domain.question.Question} entity
 */
public record QuestionUpdate(
    @NotEmpty(message = QUESTION_TEXT_CANNOT_BE_EMPTY) String text,
    @NotEmpty(message = ANSWER_CANNOT_BE_EMPTY) String answer,
    @Valid @NotNull(message = CATEGORY_NOT_PROVIDED) QuestionsCategory category
) implements Serializable {
    public static QuestionUpdate from(@Valid final QuestionUpdate update, final Long categoryId) {
        return new QuestionUpdate(
            update.text(),
            update.answer(),
            new QuestionsCategory(categoryId, update.category().name())
        );
    }
}
