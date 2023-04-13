package ru.volpi.qaadmin.dto.category;

import java.io.Serializable;

/**
 * A DTO for the {@link ru.volpi.qaadmin.domain.category.Category} entity
 */
public record CategoryUpdate(String name) implements Serializable {
}