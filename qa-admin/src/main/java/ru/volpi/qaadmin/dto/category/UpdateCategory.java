package ru.volpi.qaadmin.dto.category;

import java.io.Serializable;

public record UpdateCategory(Long id, String name) implements Serializable {
}
