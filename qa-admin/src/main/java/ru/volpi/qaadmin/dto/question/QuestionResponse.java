package ru.volpi.qaadmin.dto.question;

import ru.volpi.qaadmin.domain.question.Question;

import java.io.Serializable;

public record QuestionResponse(Long id, String text, String answer, String categoryName) implements Serializable {
    public static QuestionResponse from(final Question question) {
        return new QuestionResponse(
            question.getId(),
            question.getText(),
            question.getAnswer(),
            question.getCategory().getName()
        );
    }
}
