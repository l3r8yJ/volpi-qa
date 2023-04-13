package ru.volpi.qaadmin.dto.category;

import ru.volpi.qaadmin.domain.category.Category;

import java.io.Serializable;

/**
 * A DTO for the {@link ru.volpi.qaadmin.domain.category.Category} entity
 */
public record CategoryRegistration(String name) implements Serializable {
    public static CategoryRegistration from(final Category category) {
        return new CategoryRegistration(category.getName());
    }
}
