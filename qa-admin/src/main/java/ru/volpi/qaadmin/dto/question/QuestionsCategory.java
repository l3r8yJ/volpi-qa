package ru.volpi.qaadmin.dto.question;

import ru.volpi.qaadmin.domain.category.Category;

import java.io.Serializable;

public record QuestionsCategory(Long id, String name) implements Serializable {
    public static QuestionsCategory from(final Category category) {
        return new QuestionsCategory(category.getId(), category.getName());
    }
}
