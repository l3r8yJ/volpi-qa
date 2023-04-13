package ru.volpi.qaadmin.dto.question;

import ru.volpi.qaadmin.domain.question.Question;
import ru.volpi.qaadmin.dto.category.CategoryRegistration;

import java.io.Serializable;

public record QuestionRegistration(String text, String answer, QuestionsCategory category) implements Serializable {
    public static QuestionRegistration from(final Question question) {
        return new QuestionRegistration(
            question.getText(),
            question.getAnswer(),
            QuestionsCategory.from(question.getCategory())
        );
    }
}
