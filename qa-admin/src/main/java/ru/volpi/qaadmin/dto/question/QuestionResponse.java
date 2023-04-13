package ru.volpi.qaadmin.dto.question;

import ru.volpi.qaadmin.domain.question.Question;

import java.io.Serializable;

public record QuestionResponse(String text, String answer, String categoryName) implements Serializable {
    public static QuestionResponse from(final Question question) {
        return new QuestionResponse(
            question.getText(),
            question.getAnswer(),
            question.getCategory().getName()
        );
    }
}
