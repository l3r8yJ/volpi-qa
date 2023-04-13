package ru.volpi.qaadmin.dto.question;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

public record QuestionResponse(String name, String answer, String categoryName) implements Serializable {
}
