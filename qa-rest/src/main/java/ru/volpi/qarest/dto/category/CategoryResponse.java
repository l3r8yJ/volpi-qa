package ru.volpi.qarest.dto.category;

import ru.volpi.qarest.domain.category.Category;
import ru.volpi.qarest.dto.question.QuestionResponse;

import java.io.Serializable;
import java.util.Set;
import java.util.stream.Collectors;

public record CategoryResponse(Long id, String name, Set<QuestionResponse> questions)
    implements Serializable {
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
