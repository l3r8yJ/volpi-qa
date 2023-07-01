package ru.volpi.qaadmin.dto.category;

import ru.volpi.qaadmin.domain.category.Category;
import ru.volpi.qaadmin.dto.question.QuestionResponse;

import java.io.Serializable;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * A DTO for the {@link Category} entity
 */
public record CategoryResponse(Long id, String name, Set<QuestionResponse> questions) implements Serializable {
    public static CategoryResponse from(final Category category) {
        return new CategoryResponse(
            category.getId(),
            category.getName(),
            category.getQuestions()
                .stream()
                .map(QuestionResponse::from)
                .collect(Collectors.toSet())
        );
    }
}
