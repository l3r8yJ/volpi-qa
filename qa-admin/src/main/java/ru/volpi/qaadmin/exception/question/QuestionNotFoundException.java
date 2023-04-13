package ru.volpi.qaadmin.exception.question;

import java.io.Serial;

public class QuestionNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 5758170342992427161L;

    public QuestionNotFoundException(final Long id) {
        super("Вопрос с id '%d' не найден!".formatted(id));
    }
}
