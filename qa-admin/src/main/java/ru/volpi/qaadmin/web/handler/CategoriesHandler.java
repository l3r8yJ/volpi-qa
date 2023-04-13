package ru.volpi.qaadmin.web.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ru.volpi.qaadmin.exception.category.CategoryAlreadyExistException;
import ru.volpi.qaadmin.exception.category.CategoryNotFoundException;
import ru.volpi.qaadmin.exception.category.CategoryValidationException;

@ControllerAdvice
public class CategoriesHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(CategoryNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public final ResponseEntity<?> onCategoryNotFound(final CategoryNotFoundException exc) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exc.getMessage());
    }

    @ExceptionHandler(CategoryAlreadyExistException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public final ResponseEntity<?> onCategoryAlreadyExist(final CategoryAlreadyExistException exc) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(exc.getMessage());
    }

    @ExceptionHandler(CategoryValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public final ResponseEntity<?> onCategoryValidation(final CategoryValidationException exc) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exc.getMessage());
    }
}
