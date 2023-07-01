package ru.volpi.qaadmin.dto.category;

import jakarta.validation.constraints.NotBlank;
import ru.volpi.qaadmin.domain.category.Category;

import java.io.Serializable;

import static ru.volpi.qaadmin.validation.message.CategoryMessages.CATEGORY_CANNOT_BE_EMPTY;

/**
 * A DTO for the {@link Category} entity
 */
public record CategoryRegistration(
    @NotBlank(message = CATEGORY_CANNOT_BE_EMPTY) String name
) implements Serializable {
    public static CategoryRegistration from(final Category category) {
        return new CategoryRegistration(category.getName());
    }
}
