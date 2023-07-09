package ru.volpi.qarest.dto.question;

import java.io.Serializable;

public record QuestionResponse(Long id, String text, String answer, String category) implements Serializable {
}
