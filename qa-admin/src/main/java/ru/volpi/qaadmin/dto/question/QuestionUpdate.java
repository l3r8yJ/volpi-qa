package ru.volpi.qaadmin.dto.question;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.io.Serializable;

import static ru.volpi.qaadmin.validation.message.QuestionMessages.ANSWER_CANNOT_BE_EMPTY;
import static ru.volpi.qaadmin.validation.message.QuestionMessages.QUESTION_TEXT_CANNOT_BE_EMPTY;

/**
 * A DTO for the {@link ru.volpi.qaadmin.domain.question.Question} entity
 */
public record QuestionUpdate(
    @NotEmpty(message = QUESTION_TEXT_CANNOT_BE_EMPTY) String text,
    @NotEmpty(message = ANSWER_CANNOT_BE_EMPTY) String answer,
    @Valid QuestionsCategory category
) implements Serializable {
}
