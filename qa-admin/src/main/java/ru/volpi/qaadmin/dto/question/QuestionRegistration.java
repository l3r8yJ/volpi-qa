package ru.volpi.qaadmin.dto.question;

import ru.volpi.qaadmin.domain.question.Question;

import java.io.Serializable;

public record QuestionRegistration(String text, String answer, String categoryName) implements Serializable {
    public static QuestionRegistration from(final Question question) {
        return new QuestionRegistration(
            question.getText(),
            question.getAnswer(),
            question.getCategory().getName()
        );
    }
}
