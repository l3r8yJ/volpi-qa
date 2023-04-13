package ru.volpi.qaadmin.dto.question;

import jakarta.validation.constraints.NotNull;
import ru.volpi.qaadmin.domain.category.Category;

import java.io.Serializable;

import static ru.volpi.qaadmin.validation.message.CategoryMessages.CATEGORY_CANNOT_BE_EMPTY;

public record QuestionsCategory(
    Long id,
    @NotNull(message = CATEGORY_CANNOT_BE_EMPTY) String name
) implements Serializable {
    public static QuestionsCategory from(final Category category) {
        return new QuestionsCategory(category.getId(), category.getName());
    }
}
