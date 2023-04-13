package ru.volpi.qaadmin.exception.category;

import java.io.Serial;

public class CategoryAlreadyExistException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = -6217801806232291673L;

    public CategoryAlreadyExistException(final String name) {
        super("Категория с именем '%s' уже существует!".formatted(name));
    }
}
