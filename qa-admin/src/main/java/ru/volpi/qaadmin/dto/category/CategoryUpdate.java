package ru.volpi.qaadmin.dto.category;

import jakarta.validation.constraints.NotEmpty;
import ru.volpi.qaadmin.domain.category.Category;

import java.io.Serializable;

import static ru.volpi.qaadmin.validation.message.CategoryMessages.CATEGORY_CANNOT_BE_EMPTY;

/**
 * A DTO for the {@link Category} entity
 */
public record CategoryUpdate(
    @NotEmpty(message = CATEGORY_CANNOT_BE_EMPTY) String name
) implements Serializable {
    public static CategoryUpdate from(final Category category) {
        return new CategoryUpdate(category.getName());
    }
}
