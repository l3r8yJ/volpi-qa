package ru.volpi.qaadmin.exception.category;

import jakarta.validation.ConstraintViolation;
import ru.volpi.qaadmin.dto.category.CategoryRegistration;

import java.io.Serial;
import java.util.Collection;
import java.util.stream.Collectors;

public class CategoryValidationException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = -4353270059351408062L;

    public CategoryValidationException(String message) {
        super(message);
    }

    public CategoryValidationException(final Collection<ConstraintViolation<CategoryRegistration>> violations) {
        super(
            violations
                .stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.joining("\n"))
        );
    }
}
