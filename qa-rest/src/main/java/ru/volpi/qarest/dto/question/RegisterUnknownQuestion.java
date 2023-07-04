package ru.volpi.qarest.dto.question;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUnknownQuestion {
    @Length(max = 254, message = "Текст вопроса слишком длинный")
    @NotBlank(message = "Текст вопроса не может быть пустым")
    private String text;

    @Length(max = 254, message = "Слишком длинный почтовый адрес")
    @Email(message = "Почта должна иметь правильный формат")
    private String email;
}
