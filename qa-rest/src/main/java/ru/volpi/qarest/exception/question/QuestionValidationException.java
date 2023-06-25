package ru.volpi.qarest.exception.question;

import jakarta.validation.ConstraintViolation;
import ru.volpi.qarest.dto.question.RegisterUnknownQuestion;

import java.io.Serial;
import java.util.Collection;
import java.util.stream.Collectors;

public class QuestionValidationException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1484896566268668097L;

    public QuestionValidationException(
        final Collection<ConstraintViolation<RegisterUnknownQuestion>> violations
    ) {
        super(
            violations.stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.joining("\n"))
        );
    }
}
