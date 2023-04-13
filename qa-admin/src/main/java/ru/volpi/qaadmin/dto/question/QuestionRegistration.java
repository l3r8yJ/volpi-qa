package ru.volpi.qaadmin.dto.question;

import java.io.Serializable;

public record QuestionRegistration(String name, String answer, String categoryName) implements Serializable {
}
