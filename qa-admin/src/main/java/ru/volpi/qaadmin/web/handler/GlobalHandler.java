package ru.volpi.qaadmin.web.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalHandler extends ResponseEntityExceptionHandler {

    private static final String SERVER_ERROR = "Внутреняя ошибка сервера: %s";

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final ResponseEntity<?> onRuntimeException(final RuntimeException exc) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(GlobalHandler.SERVER_ERROR.formatted(exc.getMessage()));
    }
}
