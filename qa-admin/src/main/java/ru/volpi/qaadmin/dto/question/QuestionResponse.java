package ru.volpi.qaadmin.dto.question;

import java.io.Serializable;

public record QuestionResponse(String name, String answer, String categoryName) implements Serializable {
}
