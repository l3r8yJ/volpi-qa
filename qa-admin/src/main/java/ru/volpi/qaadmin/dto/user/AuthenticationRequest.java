package ru.volpi.qaadmin.dto.user;

import jakarta.validation.constraints.NotBlank;

import static ru.volpi.qaadmin.validation.message.UserMessages.NAME_CANT_BE_EMPTY;
import static ru.volpi.qaadmin.validation.message.UserMessages.PASSWORD_CANT_BE_EMPTY;

public record AuthenticationRequest(
    @NotBlank(message = NAME_CANT_BE_EMPTY) String username,
    @NotBlank(message = PASSWORD_CANT_BE_EMPTY) String password
) {
}
