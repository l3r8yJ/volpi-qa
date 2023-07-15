package ru.volpi.qaadmin.dto.category;

import jakarta.validation.constraints.NotEmpty;
import org.hibernate.validator.constraints.Length;
import ru.volpi.qaadmin.domain.category.Category;

import java.io.Serializable;

import static ru.volpi.qaadmin.validation.message.CategoryMessages.CATEGORY_CANNOT_BE_EMPTY;
import static ru.volpi.qaadmin.validation.message.CategoryMessages.CATEGORY_NAME_TOO_LONG;

/**
 * A DTO for the {@link Category} entity
 */
public record CategoryUpdate(
    @NotEmpty(message = CATEGORY_CANNOT_BE_EMPTY)
    @Length(message = CATEGORY_NAME_TOO_LONG, max = 128)
    String name
) implements Serializable {
    public static CategoryUpdate from(final Category category) {
        return new CategoryUpdate(category.getName());
    }
}
