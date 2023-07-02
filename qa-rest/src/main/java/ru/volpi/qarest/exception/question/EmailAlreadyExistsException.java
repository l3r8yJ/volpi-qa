package ru.volpi.qarest.exception.question;

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException() {
        super("Вы ужа задали вопрос, мы обрабатываем его");
    }
}
