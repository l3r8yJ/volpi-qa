package ru.volpi.qarest.dto.category;

import ru.volpi.qarest.dto.question.QuestionResponse;

import java.io.Serializable;
import java.util.Set;

public record CategoryResponse(Long id, String name, Set<QuestionResponse> questions) implements Serializable {
}
