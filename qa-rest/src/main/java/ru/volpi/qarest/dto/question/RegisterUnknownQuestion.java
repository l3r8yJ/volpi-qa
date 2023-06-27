package ru.volpi.qarest.dto.question;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUnknownQuestion {
    @NotBlank(message = "Текст вопроса не может быть пустым")
    private String text;

    @Email(message = "Почта должна иметь правильный формат")
    private String email;
}
