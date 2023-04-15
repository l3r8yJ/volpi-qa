package ru.volpi.qarest.exception.question;

import java.io.Serial;

public class QuestionNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 114750981203583355L;

    public QuestionNotFoundException(final String name) {
        super("Вопрос с именем '%s' не найден".formatted(name));
    }

    public QuestionNotFoundException(final Long id) {
        super("Вопрос с id '%d' не найден!".formatted(id));
    }
}
