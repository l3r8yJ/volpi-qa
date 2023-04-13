package ru.volpi.qaadmin.exception.category;

import java.io.Serial;

public class CategoryNotFoundException extends RuntimeException {


    @Serial
    private static final long serialVersionUID = 4194731930425099563L;

    public CategoryNotFoundException(final String name) {
        super("Категория с именем '%s' не найдена".formatted(name));
    }

    public CategoryNotFoundException(final Long id) {
        super("Категория с id '%d' не найдена".formatted(id));
    }
}
