package ru.volpi.qaadmin.dto.question;

import ru.volpi.qaadmin.dto.category.CategoryUpdate;

import java.io.Serializable;

/**
 * A DTO for the {@link ru.volpi.qaadmin.domain.question.Question} entity
 */
public record QuestionUpdate(String text, String answer, QuestionsCategory category) implements Serializable {
}
