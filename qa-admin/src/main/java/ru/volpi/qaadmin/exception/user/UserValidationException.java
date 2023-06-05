package ru.volpi.qaadmin.exception.user;

import jakarta.validation.ConstraintViolation;

import java.io.Serial;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

public class UserValidationException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = -8095479712817681679L;

    public UserValidationException(final Collection<ConstraintViolation<Object>> violations) {
        super(violations.stream().map(ConstraintViolation::getMessage)
            .collect(Collectors.joining("\n")));
    }
}
