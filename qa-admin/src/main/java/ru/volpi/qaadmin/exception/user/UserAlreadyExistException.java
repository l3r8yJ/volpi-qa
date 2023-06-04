package ru.volpi.qaadmin.exception.user;

import java.io.Serial;

public class UserAlreadyExistException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = -4647992075915646133L;

    public UserAlreadyExistException(final String username) {
        super("Ползьзователь '%s' уже зарегестрирован".formatted(username));
    }
}
