package ru.volpi.qarest.exception.question;

import java.io.Serial;

public class QuestionAlreadyExistsException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = -6613289056821240405L;

    public QuestionAlreadyExistsException(final String text) {
        super("На вопрос '%s' уже есть ответ в чате!".formatted(text));
    }
}
