package ru.volpi.qaadmin.exception.question;

import java.io.Serial;

public class QuestionValidationException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 566937355606443150L;

    public QuestionValidationException(final String message) {
        super(message);
    }
}
