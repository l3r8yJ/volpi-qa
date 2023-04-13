package ru.volpi.qaadmin.dto.category;

import java.io.Serializable;

/**
 * A DTO for the {@link ru.volpi.qaadmin.domain.category.Category} entity
 */
public record CategoryUpdate(Long id, String name) implements Serializable {
}