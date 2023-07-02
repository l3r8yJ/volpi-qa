package ru.volpi.qaadmin.dto.question;

import java.time.ZonedDateTime;

public record UnknownQuestionResponse(Long id, String text, ZonedDateTime createdAt) {
}
