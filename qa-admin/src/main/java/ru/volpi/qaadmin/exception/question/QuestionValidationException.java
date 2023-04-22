package ru.volpi.qaadmin.exception.question;

import jakarta.validation.ConstraintViolation;

import java.io.Serial;
import java.util.Collection;
import java.util.stream.Collectors;

public class QuestionValidationException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 566937355606443150L;

    public QuestionValidationException(final String message) {
        super(message);
    }

    public QuestionValidationException(final Collection<ConstraintViolation<Object>> violations) {
        super(
            violations
                .stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.joining("\n"))
        );
    }
}
