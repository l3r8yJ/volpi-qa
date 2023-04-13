package ru.volpi.qaadmin.dto.category;

import ru.volpi.qaadmin.dto.question.QuestionResponse;

import java.io.Serializable;
import java.util.Set;

public record CategoryResponse(String name, Set<QuestionResponse> questions) implements Serializable {
}
