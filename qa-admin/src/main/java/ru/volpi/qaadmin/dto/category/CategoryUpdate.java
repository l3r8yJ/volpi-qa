package ru.volpi.qaadmin.dto.category;

import ru.volpi.qaadmin.domain.category.Category;

import java.io.Serializable;

/**
 * A DTO for the {@link ru.volpi.qaadmin.domain.category.Category} entity
 */
public record CategoryUpdate(String name) implements Serializable {
    public static CategoryUpdate from(final Category category) {
        return new CategoryUpdate(category.getName());
    }
}
