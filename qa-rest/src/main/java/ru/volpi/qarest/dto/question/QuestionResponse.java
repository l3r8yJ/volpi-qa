package ru.volpi.qarest.dto.question;

import ru.volpi.qarest.domain.question.Question;

import java.io.Serializable;

public record QuestionResponse(Long id, String text, String answer, String category)
    implements Serializable {
    public static QuestionResponse from(final Question question) {
        return new QuestionResponse(
            question.getId(),
            question.getText(),
            question.getAnswer(),
            question.getCategory().getName()
        );
    }
}
