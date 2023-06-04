package ru.volpi.qaadmin.dto.user;

import jakarta.validation.constraints.NotEmpty;

import static ru.volpi.qaadmin.validation.message.UserMessages.NAME_CANT_BE_EMPTY;
import static ru.volpi.qaadmin.validation.message.UserMessages.PASSWORD_CANT_BE_EMPTY;

public record AuthenticationRequest(
    @NotEmpty(message = NAME_CANT_BE_EMPTY) String username,
    @NotEmpty(message = PASSWORD_CANT_BE_EMPTY) String password
) {
}
