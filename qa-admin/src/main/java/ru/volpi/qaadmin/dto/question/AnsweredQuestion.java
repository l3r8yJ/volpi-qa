package ru.volpi.qaadmin.dto.question;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnsweredQuestion {
    private Long unknownQuestionId;
    private String text;
    private String answer;
    private String category;
}
