package ru.volpi.qaadmin.dto.question;

import java.io.Serializable;

public record UpdateQuestion(Long id, String text, String answer, String categoryName) implements Serializable {
}
