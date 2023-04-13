package ru.volpi.qaadmin.dto.question;

import java.io.Serializable;

public record QuestionResponse(String text, String answer, String categoryName) implements Serializable {
}
